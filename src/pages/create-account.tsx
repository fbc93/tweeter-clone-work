import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "@src/components/form/input";
import IntroLayout from "@src/components/layout/intro";
import { useEffect } from "react";
import useMutation from "@src/libs/client/useMutation";
import ContentBox from "@src/components/form/contentBox";
import ValidationText from "@src/components/form/validationText";
import SubmitButton from "@src/components/form/submitButton";

export interface MutationResult {
  ok: boolean;
  errors?: any;
  error?: any;
}

export interface ValidFormData extends MutationResult {
  email: string;
  password: string;
  nickname: string;
}

const CreateAccount: NextPage = () => {
  const router = useRouter();
  const [createAccount, { isLoading, data }] = useMutation<MutationResult>("/api/users/create-account");
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<ValidFormData>({
    mode: "onChange"
  });

  const onValid = (validData: ValidFormData) => {
    if (isLoading) return;
    createAccount(validData);
  }

  useEffect(() => {
    if (data?.ok) {
      alert("🎉 가입완료, 로그인 페이지로 이동합니다.");
      router.push("/log-in");
    }
  }, [data, router, errors]);

  return (
    <IntroLayout seoTitle="회원가입">
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <Input
            register={register("email", { required: "이메일은 필수값 입니다." })}
            label="이메일 *"
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <ValidationText content={errors.email.message} />}
          {data?.errors?.length == 2 && data?.errors[0].type === "email" && <ValidationText content={data?.errors[0].message} />}
          {data?.errors?.length == 1 && data?.errors[0].type === "email" && <ValidationText content={data?.errors[0].message} />}

        </div>
        <div>
          <Input
            register={register("password", { required: "비밀번호는 필수값 입니다." })}
            label="비밀번호 *"
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && <div className="text-red-400">{errors.password.message}</div>}

        </div>
        <div>
          <Input
            register={register("nickname", {
              required: "닉네임은 필수값 입니다.",
              maxLength: { value: 6, message: "6글자 이내로 입력하세요" }
            })}
            label="닉네임"
            type="text"
            name="nickname"
            id="nickname"
            placeholder="닉네임을 입력하세요"
          />
          {errors.nickname && <ValidationText content={errors.nickname.message} />}
          {data?.errors?.length == 2 && data?.errors[1].type === "nickname" && <ValidationText content={data?.errors[1].message} />}
          {data?.errors?.length == 1 && data?.errors[0].type === "nickname" && <ValidationText content={data?.errors[0].message} />}

        </div>
        <SubmitButton content={isLoading ? "가입 중..." : "가입하기"} loading={isLoading} />
      </form>
      <div>
        <ContentBox
          title="이미 계정이 있으신가요?"
          linkText="로그인하기"
          link="/log-in"
        />
      </div>
    </IntroLayout>
  );
}

export default CreateAccount;