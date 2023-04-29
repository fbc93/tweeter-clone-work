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

  return (
    <Layout
      seoTitle="메인"
      depthAppbarLeft={false}
      depthAppbarRight={false}
    >
      <Body>
        <div className="">
          {data?.posts?.map((post, index) => (
            <Link
              href={`/posts/${post.id}`}
              key={index}
              className="block border-b border-white/20 last:border-none"
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
              />
            </Link>
          ))}
        </div>
      </Body>
    </Layout>
  )
}

export default Home;