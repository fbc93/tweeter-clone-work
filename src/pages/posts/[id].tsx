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
import CommentReply from "@src/components/post/commentReply";
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
  const { data, mutate } = useSWR<postDetailResponse>((`/api/posts/${router.query.id}`));


  // POST
  const [toggleLike] = useMutation(`/api/posts/${router.query.id}/likes`);
  const [uploadComment, { isLoading }] = useMutation<WriteCommentResponse>(`/api/posts/${router.query.id}`);

  // Form
  const { register, handleSubmit, resetField, watch } = useForm<ValidFormData>();

  //onValid
  // const onValid = (uploadData: ValidFormData) => {
  //   if (isLoading) return;
  //   uploadComment(uploadData);

  //   if (!data) return;

  //   data.post.comments.push({
  //     content: uploadData.content,
  //     createdAt: new Date(),
  //     user: {
  //       avatar: user?.avatar,
  //       nickname: user?.nickname
  //     }
  //   });

  //   console.log(uploadData);
  //   resetField("content");
  // }

  // //Click to ToggleLike
  // const onClickLike = () => {
  //   toggleLike({});
  //   if (!data) return;

  //   mutate(
  //     {
  //       ...data,
  //       post: {
  //         ...data.post,
  //         _count: {
  //           ...data.post._count,
  //           likes: data.isLiked
  //             ? data?.post._count.likes - 1
  //             : data?.post._count.likes + 1,
  //         },
  //       },
  //       isLiked: !data.isLiked,

  //     },
  //     false
  //   );
  // }

  // const onClickCommentLike = (data: any) => {

  //   toggleLike({});
  //   router.push(`/posts/${router.query.id}/?commentId=2`);
  // }

  console.log(data)


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
        <h1 className="text-white">it Works</h1>
      </Body>
    </Layout >
  )
}

export default PostDetail;