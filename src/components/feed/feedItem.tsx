import { editYoutubeUrl } from "@src/libs/client/utils";
import Image from "next/image";
import YoutubePreviewBox from "../form/youtubePreviewBox";
import PostBottom from "../post/postBottom";
import PostTop from "../post/postTop";
interface FeedItemProps {
  author: string;
  avatar: string;
  content: string;
  image?: string;
  youtube?: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

const FeedItem = ({
  author,
  avatar,
  content,
  image,
  youtube,
  createdAt,
  likes,
  comments
}: FeedItemProps) => {

  return (
    <div className="flex flex-row justify-start border-b border-white/20 py-4 pr-4 last:border-none">
      <div className="w-1/5">
        <div className="w-11 h-11 bg-gray-600 rounded-full overflow-hidden shadow-lg">
          {avatar.startsWith('avatar_') && (
            <Image
              src={`/images/avatar/${avatar}.png`}
              blurDataURL={`/images/avatar/${author}.png`}
              width={48}
              height={48}
              className="h-full w-full"
              alt="basic profile"
            />
          )}
          {!avatar.startsWith('avatar_') && (
            <Image
              src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${avatar}/profile`}
              blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${avatar}/profile`}
              width={48}
              height={48}
              className="h-full w-full"
              alt="custom profile"
            />
          )}
        </div>
      </div>
      <div className="w-4/5">
        <PostTop author={author} createdAt={createdAt} />
        <div className="w-full hover:underline-offset-4">
          <p className="text-left text-sm tracking-tighter leading-5 font-thin">{content}</p>
        </div>

        {image && (
          <div className="mt-4 aspect-auto mx-auto bg-slate-900 rounded-md shadow-lg overflow-hidden">
            <Image
              src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${image}/public`}
              width={300}
              height={300}
              className="aspect-auto"
              alt="post appendix image"
            />
          </div>
        )}

        {youtube && (
          <div className="mt-4">
            <YoutubePreviewBox youtubeUrl={editYoutubeUrl(youtube)} />
          </div>
        )}

        {/* 댓글, 좋아요, 공유 */}
        <div className="flex justify-between items-center mt-4">
          <PostBottom
            comments={comments}
            views={19}
            likes={likes}
            shares={true}
          />
        </div>
      </div>
    </div>
  );
}
export default FeedItem;