import Image from "next/image";
import PostBottom from "./postBottom";
import PostTop from "./postTop";

interface CommentProps {
  avatar?: string;
  author?: string;
  createdAt: Date;
  content: string;
  commentId?: number;
  onClickCommentLike?: any;
}

const CommentBox = ({ avatar, author, createdAt, content, onClickCommentLike, commentId }: CommentProps) => {
  return (
    <div className="flex flex-row justify-start border-b border-white/20 py-4 pl-2 pr-4 bg-white/10">
      <div className="w-1/5">
        <div className="w-11 h-11 bg-gray-600 rounded-full overflow-hidden shadow-lg">
          {avatar?.startsWith('avatar_') && (
            <Image
              src={`/images/avatar/${avatar}.png`}
              blurDataURL={`/images/avatar/${author}.png`}
              width={48}
              height={48}
              className="h-full w-full"
              alt="basic profile"
            />
          )}
          {!avatar?.startsWith('avatar_') && (
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
      </div>
    </div>
  );
}

export default CommentBox;