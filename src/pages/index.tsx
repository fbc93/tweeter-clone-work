import Body from "@src/components/layout/body";
import Layout from "@src/components/layout/main";
import useSWR from "swr";
import { NextPage } from "next";
import FeedItem from "@src/components/feed/feedItem";
import Link from "next/link";

interface AuthorData {
  nickname: string;
  avatar: string;
}

interface CountData {
  likes: number;
  comments: number;
}
interface PostData {
  id: number;
  author: AuthorData,
  content: string;
  image?: string;
  youtube?: string;
  createdAt: Date;
  updatedAt: Date;
  _count: CountData;
}
interface PostsResponse {
  ok: boolean;
  posts: PostData[];
}


const Home: NextPage = () => {
  const { data } = useSWR<PostsResponse>("/api/posts");
  //console.log(data)

  return (
    <Layout
      seoTitle="메인"
      depthAppbarLeft={false}
      depthAppbarRight={false}
    >
      <Body>
        <div className="">
          {data?.posts ? (
            data.posts.map((post, index) => (
              <Link
                href={`/posts/${post.id}`}
                key={index}
                className="block border-b border-white/20"
              >
                <FeedItem
                  key={index}
                  author={post.author.nickname}
                  avatar={post.author.avatar}
                  content={post.content}
                  image={post?.image}
                  youtube={post?.youtube}
                  likes={post?._count.likes}
                  createdAt={post.createdAt}
                  comments={post?._count.comments}
                />
              </Link>
            ))
          ) : (
            <div className="mt-6">
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
        </div>
      </Body>
    </Layout>
  )
}

export default Home;