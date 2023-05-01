import Avatar from "@src/components/profile/avatar";
import Input from "@src/components/form/input";
import SubmitButton from "@src/components/form/submitButton";
import ValidationText from "@src/components/form/validationText";
import Body from "@src/components/layout/body";
import Layout from "@src/components/layout/main";
import useMutation from "@src/libs/client/useMutation";
import useUser from "@src/libs/client/useUser";
import { changeDateForm, profileArr } from "@src/libs/client/utils";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface ValidFormData {
  ok: boolean;
  avatar?: FileList | string;
  nickname: string;
  password: string;
}
interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditPofile: NextPage = () => {

  const onClickCustomReset = () => customReset();
  const { user } = useUser();
  const [updateProfile, { data, isLoading }] = useMutation<EditProfileResponse>("/api/users/me");

  //nickname, password
  const { register, handleSubmit, formState: { errors } } = useForm<ValidFormData>({
    mode: "onChange",
    defaultValues: {
      nickname: user?.nickname,
      password: user?.password
    }
  });

  //basic avatar
  const {
    register: basicRegister,
    watch: basicWatch,
    getValues
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: user?.avatar || "avatar_01"
    }
  });

  //custom avatar
  const {
    register: customRegister,
    watch: customWatch,
    reset: customReset
  } = useForm({
    mode: "onChange"
  });

  //onValid
  const onValid = async (updateData: ValidFormData) => {
    const custom = customWatch("custom");
    const avatarData = basicWatch("avatar");

    if (isLoading) return;
    if (custom && custom.length >= 1 && user) {

      //ask for CF URL
      const file = custom[0];
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();

      form.append("file", file, user.id + "");

      const { result: { id } } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      updateData.avatar = id;
      updateProfile(updateData);
    }

    if (custom && custom.length === 0) {
      updateData.avatar = avatarData;
      updateProfile(updateData)
    }
  }

  //check avatar type
  const [customAvatar, setCustomAvatar] = useState(true);
  const custom = customWatch("custom");

  useEffect(() => {
    if (custom === undefined) {
      setCustomAvatar(false);
    }

    if (user?.avatar.startsWith("avatar_") && custom && custom.length === 0) {
      setCustomAvatar(false);
    }

    if (!user?.avatar.startsWith("avatar_") && custom && custom.length === 0) {
      setCustomAvatar(true);
    }

    if (custom && custom.length >= 1) {
      setCustomAvatar(true);
    }

  }, [custom, setCustomAvatar, user])

  const selectBasicAvatar = () => {
    setCustomAvatar(false);
  }

  useEffect(() => {
    if (data?.ok) {
      alert("🥳 변경사항이 업데이트되었습니다.");
    }
  }, [data]);

  return (
    <Layout
      seoTitle="회원정보"
      depthAppbarLeft={true}
      depthAppbarRight={true}
      depthAppbarTitle="User Information"
      backIcon={true}
      depthAppbar={true}
      removeNavbar={true}
    >
      <Body>
        {/* 사용자 현재 아바타 */}
        <div className="flex justify-center pt-10 pb-7 shadow-md">

          {/* 현재 아바타와 같을 경우 */}
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-[158px] h-[158px] overflow-hidden flex justify-center self-center items-center rounded-full">
            {user?.avatar === basicWatch("avatar") && customWatch("custom") === undefined && (
              <Image
                width={150}
                height={150}
                src={basicWatch("avatar").startsWith('avatar_') ?
                  `/images/avatar/${basicWatch("avatar")}.png` :
                  `https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/profile`}
                alt="프로필 프리뷰"
                className="rounded-full w-[150px] h-[150px]"
              />
            )}
            {user?.avatar === basicWatch("avatar") && customWatch("custom") && customWatch("custom").length === 1 && (
              <Image
                width={150}
                height={150}
                src={URL.createObjectURL(customWatch("custom")[0])}
                alt="프로필 프리뷰"
                className="rounded-full w-[150px] h-[150px]"
              />
            )}
            {user?.avatar === basicWatch("avatar") && customWatch("custom") && customWatch("custom").length === 0 && (
              <Image
                width={150}
                height={150}
                src={basicWatch("avatar").startsWith('avatar_') ?
                  `/images/avatar/${basicWatch("avatar")}.png` :
                  `https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/profile`}
                alt="프로필 프리뷰"
                className="rounded-full w-[150px] h-[150px]"
              />
            )}

            {/* 현재 아바타와 다른 경우 */}
            {user?.avatar != basicWatch("avatar") && customWatch("custom") === undefined && (
              <Image
                width={150}
                height={150}
                src={basicWatch("avatar").startsWith('avatar_') ?
                  `/images/avatar/${basicWatch("avatar")}.png` :
                  `https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/profile`}
                alt="프로필 프리뷰"
                className="rounded-full w-[150px] h-[150px]"
              />
            )}
            {user?.avatar != basicWatch("avatar") && customWatch("custom") && customWatch("custom").length === 1 && (
              <Image
                width={150}
                height={150}
                src={URL.createObjectURL(customWatch("custom")[0])}
                alt="프로필 프리뷰"
                className="rounded-full aspect-square"
              />
            )}
            {user?.avatar != basicWatch("avatar") && customWatch("custom") && customWatch("custom").length === 0 && (
              <div>
                <Image
                  width={150}
                  height={150}
                  src={basicWatch("avatar").startsWith('avatar_') ?
                    `/images/avatar/${basicWatch("avatar")}.png` :
                    `https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/profile`}
                  alt="프로필 프리뷰"
                  className="rounded-full w-[150px] h-[150px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="mb-10">
          <div className="flex justify-center flex-col text-center mb-2">
            <div className="text-white mb-2 text-2xl">{user?.nickname}</div>
            <div className="text-white text-lg">{user?.email}</div>
          </div>
          <div className="flex justify-center mb-2">
            <span className="text-gray-400 text-sm inline-block">가입일</span>
            <span className="text-gray-400 text-sm inline-block mx-2">|</span>
            <span className="text-gray-400 text-sm">
              {changeDateForm(user?.createdAt as Date)}
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-gray-500 text-xs mr-2 tracking-tighter">
              {changeDateForm(user?.updatedAt as Date)}
            </span>
            <span className="text-gray-500 text-xs inline-block">정보 업데이트</span>
          </div>
        </div>

        {/* 아바타 선택 */}
        <div className="flex justify-between mb-5">
          <button
            onClick={selectBasicAvatar}
            type="button" className="w-1/2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            기본 아바타 선택
          </button>

          {/* 사용자 커스텀 아바타 */}
          <form className="w-1/2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            <label className="cursor-pointer">
              직접 사진 업로드
              <input
                {...customRegister("custom")}
                id="custom"
                name="custom"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </form>
        </div>

        {/* 사용자 아바타 수정 */}
        <form onClick={onClickCustomReset} className="flex justify-center flex-wrap mx-auto">
          {profileArr.map((avatar, index) => (
            <Avatar
              avatarRegister={basicRegister("avatar")}
              key={index}
              index={index}
              fileName={avatar}
              disabled={customAvatar}
              disableImage={customAvatar}
            />
          ))}
        </form>

        {/* 사용자 닉네임, 비밀번호 수정 */}
        <form onSubmit={handleSubmit(onValid)}>
          <div className="mt-5 mb-5">
            <Input
              register={register("nickname", {
                required: "닉네임은 필수값 입니다.",
                maxLength: { value: 6, message: "6글자 이내로 입력하세요" }
              })}
              label="닉네임"
              type="text"
              id="nickname"
              name="nickname"
              required={true}
            />
            <div className="mb-5">
              {errors.nickname && <ValidationText content={errors.nickname.message} />}
              {!data?.ok && <ValidationText content={data?.error} />}
            </div>
            <div className="mb-10">
              <Input
                register={register("password", {
                  required: "비밀번호는 필수값 입니다.",
                })}
                label="비밀번호"
                type="password"
                id="password"
                name="password"
                required={true}
              />
              {errors.password && <ValidationText content={errors.password.message} />}
            </div>
          </div>
          <div className="pb-10">
            <SubmitButton content={isLoading ? "업데이트 중..." : "업데이트하기"} loading={isLoading} />
          </div>
        </form>
      </Body>
    </Layout >
  )
}

export default EditPofile;