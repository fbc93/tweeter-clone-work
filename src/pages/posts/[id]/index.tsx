import Body from "@src/components/layout/body"
import Layout from "@src/components/layout/main"
import useSWR from "swr";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { editYoutubeUrl } from "@src/libs/client/utils";
import Image from "next/image";
import YoutubePreviewBox from "@src/components/form/youtubePreviewBox";
import useMutation from "@src/libs/client/useMutation";
import FeedItem from "@src/components/feed/feedItem";
import useUser from "@src/libs/client/useUser";
import PostBottom from "@src/components/post/postBottom";
import CommentReply from "@src/components/post/commentReply";
import Comment from "@src/components/post/comment";

interface AuthorData {
  nickname: string;
  avatar: string;
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
  }
}

interface postDetailResponse {
  ok: boolean;
  post: PostDetailData;
  isLiked: boolean;
}

const PostDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<postDetailResponse>((router.query.id ? `/api/posts/${router.query.id}` : null));
  const [toggleLike] = useMutation(`/api/posts/${router.query.id}/likes`);

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
        {data?.post && (
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
                    priority={true}
                    alt="author profile"
                  />
                ) : (
                  <Image
                    blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${data.post.author.avatar}/avatar`}
                    src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${data.post.author.avatar}/avatar`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    priority={true}
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
                  priority={true}
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
              <div className="flex justify-between items-center border-b border-t border-white/20 py-4">
                <PostBottom
                  comments={12}
                  views={11}
                  likes={data.post._count.likes}
                  onClickLike={onClickLike}
                  isLiked={data.isLiked}
                  shares={true}
                />
              </div>
            </div>

            {/* 댓글 */}
            <div>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Comment
                  key={index}
                  avatar="avatar_04"
                  author="댓글테스터"
                  createdAt={new Date()}
                  content="댓글 테스트 중입니다."
                  likes={12}
                />
              ))}
            </div>

            {/* 대댓글 */}
            <CommentReply
              author="대댓글개발자"
              avatar="avatar_05"
              content="대댓글 테스트입니다."
              Likes={14}
              createdAt={new Date()}
            />
          </div>
        )}

        {/* 댓글 업로드 Form */}
        <form className="w-full mx-auto fixed bottom-0 left-0 backdrop-blur-md bg-gray-900/80">
          <div className="flex justify-between w-container mx-auto px-[20px] py-5">
            <label htmlFor="" className="cursor-pointer flex justify-center items-center text-sm">
              {/* 내 프로필 */}
              <div className="w-9 h-9 rounded-full shadow-lg overflow-hidden mr-4">
                {user?.avatar.startsWith('avatar_') ? (
                  <Image
                    blurDataURL={`/images/avatar/${user?.avatar}.png`}
                    src={`/images/avatar/${user?.avatar}.png`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    priority={true}
                    alt="author profile"
                  />
                ) : (
                  <Image
                    blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/avatar`}
                    src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/avatar`}
                    width={36}
                    height={36}
                    className="aspect-square"
                    priority={true}
                    alt="author profile"
                  />
                )}
              </div>
              {/* 댓글내용 */}
              <div className="block overflow-hidden w-[220px]">
                <input
                  type="text"
                  placeholder={`${user?.nickname} (으)로 댓글 달기`}
                  className="w-full rounded-md h-full text-white border border-blue-700 placeholder:text-white/50 px-2 bg-transparent block indent-2 focus:outline-none text-xs drop-shadow-sm"
                />
              </div>
            </label>
            {/* 댓글작성 버튼 */}
            <div className="p-2 bg-blue-700 hover:bg-blue-700/80 rounded-md cursor-pointer">
              <svg className="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
              </svg>
            </div>
          </div>
        </form>
      </Body>
    </Layout >
  )
}

export default PostDetail;