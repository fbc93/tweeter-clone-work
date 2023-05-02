import Body from "@src/components/layout/body"
import Layout from "@src/components/layout/main"
import useSWR from "swr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { editYoutubeUrl } from "@src/libs/client/utils";
import Image from "next/image";
import YoutubePreviewBox from "@src/components/form/youtubePreviewBox";
import useMutation from "@src/libs/client/useMutation";
import useUser from "@src/libs/client/useUser";
import PostBottom from "@src/components/post/postBottom";
import CommentBox from "@src/components/post/commentBox";
import { useForm } from "react-hook-form";
import { calcDateFromNow } from "@src/libs/client/utils";
import { useState } from "react";

interface AuthorData {
  nickname: string;
  avatar: string;
}

interface TestData {
  content: string;
  createdAt: Date;
  user: {
    nickname?: string;
    avatar?: string;
  }
}
interface PostDetailData {
  author: AuthorData;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  youtube?: string;
  _count: {
    likes: number;
    comments: number;
    views: number;
  },
  comments: TestData[];
}
interface postDetailResponse {
  ok: boolean;
  post: PostDetailData;
  isLiked: boolean;
}

interface ValidFormData {
  ok: boolean;
  content: string;
}

interface WriteCommentResponse {
  ok: boolean;
  error?: string;
}

const PostDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  //GET
  const { data, mutate } = useSWR<postDetailResponse>((router.query.id ? `/api/posts/${router.query.id}` : null));

  // POST
  const [toggleLike] = useMutation(`/api/posts/${router.query.id}/likes`);
  const [uploadComment, { isLoading }] = useMutation<WriteCommentResponse>(`/api/posts/${router.query.id}`);

  // Form
  const { register, handleSubmit, resetField, watch } = useForm<ValidFormData>();

  //onValid
  const onValid = (uploadData: ValidFormData) => {
    if (isLoading) return;
    uploadComment(uploadData);

    if (!data) return;

    data.post.comments.push({
      content: uploadData.content,
      createdAt: new Date(),
      user: {
        avatar: user?.avatar,
        nickname: user?.nickname
      }
    });

    console.log(uploadData);
    resetField("content");
  }

  //Click to ToggleLike
  const onClickLike = () => {
    toggleLike({});
    if (!data) return;

    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            likes: data.isLiked
              ? data?.post._count.likes - 1
              : data?.post._count.likes + 1,
          },
        },
        isLiked: !data.isLiked,

      },
      false
    );
  }





  return (
    <Layout
      seoTitle="회원정보"
      depthAppbarLeft={true}
      depthAppbarRight={true}
      depthAppbarTitle="Post Detail"
      backIcon={true}
      depthAppbar={true}
      removeNavbar={true}
    >
      <Body>
        {data?.post ? (
          <div className="w-full box-border rounded-lg shadow-lg">
            <div className="flex flex-row items-center mb-2 mt-4">
              {/* 작성자 아바타 */}
              <div className="w-9 h-9 rounded-full shadow-lg overflow-hidden mr-4">
                {data.post.author.avatar?.startsWith('avatar_') ? (
                  <Image
                    blurDataURL={`/images/avatar/${data.post.author.avatar}.png`}
                    src={`/images/avatar/${data.post.author.avatar}.png`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    alt="author profile"
                  />
                ) : (
                  <Image
                    blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${data.post.author.avatar}/avatar`}
                    src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${data.post.author.avatar}/avatar`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    alt="author profile"
                  />
                )}
              </div>
              <div className="flex items-center">
                <div className="text-[18px] text-gray-300 font-normal">{data.post.author.nickname}</div>
              </div>
            </div>
            <div className="leading-6 font-thin tracking-tighter text-[18px] text-left w-full inline-block">
              {data.post.content}
            </div>

            {/* 이미지 첨부 */}
            {data.post.image && (
              <div className="mt-4 aspect-auto mx-auto bg-slate-900 rounded-md shadow-lg overflow-hidden">
                <Image
                  src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${data.post.image}/public`}
                  width={300}
                  height={300}
                  className="aspect-auto w-full h-auto"
                  alt="post appendix image"
                />
              </div>
            )}

            {/* 유튜브 첨부 */}
            {data.post.youtube && (
              <div className="mt-4">
                <YoutubePreviewBox youtubeUrl={editYoutubeUrl(data.post.youtube)} />
              </div>
            )}

            <div className="text-xs mt-4 text-left text-white/50">{data.post.createdAt + ""}</div>
            <div className="mt-4">
              <div className="flex justify-end items-center border-b border-t border-white/20 py-4">
                <PostBottom
                  comments={data.post._count.comments}
                  likes={data.post._count.likes}
                  onClickLike={onClickLike}
                  isLiked={data.isLiked}
                />
              </div>
            </div>

            {/* 댓글 */}
            <div>
              {data.post.comments?.map((item, index) => (
                <CommentBox
                  key={index}
                  avatar={item.user.avatar}
                  author={item.user.nickname}
                  createdAt={item.createdAt}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 댓글 업로드 Form */}
        <form onSubmit={handleSubmit(onValid)} className="w-full mx-auto fixed bottom-0 left-0 backdrop-blur-md bg-gray-900/80">
          <div className="flex justify-between w-container mx-auto px-[20px] py-5">
            <label htmlFor="" className="cursor-pointer flex justify-center items-center text-sm">
              {/* 내 프로필 */}
              <div className="w-9 h-9 rounded-full shadow-lg overflow-hidden mr-2">
                {user?.avatar.startsWith('avatar_') && (
                  <Image
                    blurDataURL={`/images/avatar/${user?.avatar}.png`}
                    src={`/images/avatar/${user?.avatar}.png`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    alt="author profile"
                  />
                )}
                {!user?.avatar.startsWith('avatar_') && (
                  <Image
                    blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/avatar`}
                    src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/avatar`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    alt="author profile"
                  />
                )}
              </div>

              {/* 댓글내용 */}
              <div className="block overflow-hidden w-[230px]">
                <input
                  {...register("content", {
                    required: {
                      value: true,
                      message: "내용을 입력하세요."
                    }
                  })}
                  type="text"
                  placeholder={`${user?.nickname} (으)로 댓글 달기`}
                  className={`w-full rounded-md h-[36px] text-white border placeholder:text-white/50 px-2 bg-transparent block indent-2 focus:outline-none text-xs drop-shadow-sm ${!watch("content") ? "border-gray-700 focus:border-gray-700 focus:ring-0" : "border-blue-700"}`}
                />
              </div>
            </label>

            {/* 댓글작성 버튼 */}
            <input type="submit" value="댓글" disabled={!watch("content") ? true : false} className="disabled:bg-gray-400 p-2 bg-blue-700 hover:bg-blue-700/80 rounded-sm text-xs cursor-pointer" />


          </div>
        </form>
      </Body>
    </Layout >
  )
}

export default PostDetail;