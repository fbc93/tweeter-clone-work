import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Input from "@src/components/form/input";
import IntroLayout from "@src/components/layout/intro";
import { useRouter } from "next/router";
import useMutation from "@src/libs/client/useMutation";
import { MutationResult, ValidFormData } from "./create-account";
import { useEffect } from "react";
import ContentBox from "@src/components/form/contentBox";
import ValidationText from "@src/components/form/validationText";
import SubmitButton from "@src/components/form/submitButton";

const Login: NextPage = () => {
  const router = useRouter();
  const [checkAccount, { isLoading, data }] = useMutation<MutationResult>("/api/users/log-in");
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<ValidFormData>({
    mode: "onChange"
  });

  const onValid = (validData: ValidFormData) => {
    if (isLoading) return;
    checkAccount(validData);
  }

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }

    if (!data?.ok) {

    }
  }, [data, router, isLoading]);

  return (
    <IntroLayout seoTitle="로그인">
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <Input
            register={register("email", { required: "이메일은 필수값 입니다." })}
            label="이메일"
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <ValidationText content={errors.email.message} />}
          {data?.error?.type === "email" && <ValidationText content={data?.error?.message} />}

        </div>
        <div>
          <Input
            register={register("password", { required: "비밀번호는 필수값 입니다." })}
            label="비밀번호"
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && <ValidationText content={errors.password.message} />}
          {data?.error?.type === "password" && <ValidationText content={data?.error?.message} />}

        </div>
        <SubmitButton content={isLoading ? "로그인 중..." : "로그인"} />
      </form>
      <div>
        <ContentBox
          title="처음이신가요?"
          linkText="회원가입하기"
          link="/create-account"
        />
      </div>
    </IntroLayout>
  );
}

export default Login;