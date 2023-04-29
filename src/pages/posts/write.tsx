import { Post } from "@prisma/client";
import AttachFileInput from "@src/components/form/attachFileInput";
import ImagePreviewBox from "@src/components/form/imagePreviewBox";
import SubmitButton from "@src/components/form/submitButton";
import ValidationText from "@src/components/form/validationText";
import YoutubePreviewBox from "@src/components/form/youtubePreviewBox";
import Body from "@src/components/layout/body";
import Layout from "@src/components/layout/main";
import useMutation from "@src/libs/client/useMutation";
import useUser from "@src/libs/client/useUser";
import { editYoutubeUrl } from "@src/libs/client/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface ValidFormData {
  ok: boolean;
  imageFile?: any;
  youtubeUrl?: string;
  content: string;
  post: Post;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

const WriteTweet: NextPage = () => {

  //유저정보
  const { user } = useUser();
  const router = useRouter();

  //useMutation
  const [uploadPost, { data, isLoading }] = useMutation<WriteResponse>("/api/posts");

  //첨부파일 
  const {
    register: attachRegister,
    handleSubmit: attachSubmit,
    watch: attachWatch,
    resetField,
  } = useForm<ValidFormData>({
    mode: "onChange"
  });

  //텍스트 컨텐츠
  const {
    register: contentRegister,
    watch: contentWatch,
    reset: contentReset,
    formState: { errors },
    setError
  } = useForm<ValidFormData>({
    mode: "onChange"
  });

  //onValid
  const onValid = async (uploadData: ValidFormData) => {
    const { imageFile, youtubeUrl, content } = uploadData;
    const contentData = contentWatch("content");
    uploadData.content = contentData;

    if (isLoading) return;
    if (imageFile && imageFile.length >= 1 && user) {

      //ask for CF URL
      const file = imageFile[0];
      uploadData.imageFile = file.name;

      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();

      form.append("file", file, user?.id + "");

      const { result: { id } } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      uploadData.imageFile = id;
      uploadPost(uploadData);
    }

    if (imageFile && imageFile.length === 0 && user) {
      uploadData.imageFile = "";
      uploadPost(uploadData);
    }

    console.log(uploadData);
  }

  useEffect(() => {
    if (data?.ok) {
      alert("작성하신 글이 업로드되었습니다.");
      router.push("/");
    }

    setError("content", {
      type: "manual",
      message: "글 내용을 채워주세요. 내용 작성은 필수입니다."
    });

  }, [data, router, setError]);

  //클릭하여 리셋
  const onClickDeleteImageFile = () => resetField("imageFile");
  const onClickDeleteYoutubeUrl = () => resetField("youtubeUrl");

  return (
    <Layout
      seoTitle="글쓰기"
      depthAppbarLeft={true}
      depthAppbarRight={false}
      depthAppbarTitle="Write Post"
      depthAppbar={true}
      closeIcon={true}
      removeNavbar={true}
      blankArea={true}
    >
      <Body>
        {/* 첨부파일 프리뷰 */}
        {attachWatch("imageFile") && attachWatch("imageFile")[0] && attachWatch("imageFile")[0].length === undefined && (
          <div className="mt-5">
            <ImagePreviewBox imageFile={attachWatch("imageFile")[0]} />
          </div>
        )}
        {attachWatch("imageFile") && attachWatch("imageFile")[0] && attachWatch("imageFile")[0].length > 0 && (
          <div className="mt-5">
            <ImagePreviewBox imageFile={attachWatch("imageFile")[0]} />
          </div>
        )}
        {attachWatch("youtubeUrl") && attachWatch("youtubeUrl") != undefined && (
          <div className="mt-5">
            <YoutubePreviewBox youtubeUrl={editYoutubeUrl(attachWatch("youtubeUrl") as string)} />
          </div>
        )}

        {/* 글작성 폼 */}
        <form className="pt-5 pb-[115px]">
          <div className="relative">
            <div className="mb-2">
              {errors.content && <ValidationText content={errors.content.message} />}
            </div>
            <textarea
              {...contentRegister("content", {
                required: {
                  value: true,
                  message: "글 내용을 채워주세요. 내용 작성은 필수입니다."
                }
              })}
              id="content"
              name="content"
              placeholder="내용을 입력하세요."
              className={`text-white block text-md p-5 resize-none rounded-lg w-full h-[50vh] bg-black outline-none border-none outline-1 focus:outline-offset-0 ${errors.content && "outline-red-600 focus:outline-red-600"}`}
            />
          </div>
        </form>

        {/* 첨부파일 바텀 */}
        <div className="fixed z-100 bottom-0 left-0 w-full mx-auto">
          <div className="text-white left-0 w-full backdrop-blur-sm bg-black/70 py-5">

            {/* 최종 업로드 Form */}
            <form onSubmit={attachSubmit(onValid)} className="w-container mx-auto px-[20px]">
              <div className="mb-3">
                <AttachFileInput
                  labelName="imageFile"
                  id="imageFile"
                  name="imageFile"
                  accept="/image/*"
                  type="file"
                  register={attachRegister("imageFile")}
                  onClickHandler={onClickDeleteImageFile}
                  imageIcon={true}
                />
              </div>
              <div>
                <AttachFileInput
                  labelName="youtubeUrl"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  type="text"
                  placeholder="유튜브 링크를 붙여넣으세요"
                  register={attachRegister("youtubeUrl")}
                  onClickHandler={onClickDeleteYoutubeUrl}
                  youtubeIcon={true}
                />
              </div>
              {/* 업로드 버튼 */}
              <div className="mt-5">
                <SubmitButton content="업로드하기" loading={false} />
              </div>
            </form>
          </div>
        </div>
      </Body>
    </Layout >
  )
}

export default WriteTweet;