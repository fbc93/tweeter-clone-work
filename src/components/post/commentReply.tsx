import FeedItem from "../feed/feedItem";
import CommentBox from "@src/components/post/commentBox";

interface CommentReplyProps {
  author: string;
  avatar: string;
  content: string;
  Likes: number;
  createdAt: Date;
}

const CommentReply = ({
  author,
  avatar,
  content,
  Likes,
  createdAt,

}: CommentReplyProps) => {
  return (
    <div className="pl-10 border-t border-white/20 bg-[rgba(255,255,255,0.1)]">
      <CommentBox
        author={author}
        avatar={avatar}
        content={content}
        likes={Likes}
        createdAt={createdAt}
      />
    </div>
  );
}

export default CommentReply;