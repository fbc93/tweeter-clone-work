interface PostBottomProps {
  likes: number;
  comments: number;
  shares?: boolean;
  onClickLike?: () => void;
  isLiked?: boolean;
  reply?: boolean;
  onClickCommentLike?: any;
  commentId?: number;
}

const PostBottom = ({ likes, comments, onClickLike, isLiked, reply, onClickCommentLike, commentId }: PostBottomProps) => {
  return (
    <>
      {/* 댓글 */}
      {comments >= 0 && (
        <div className="w-1/2 flex justify-center items-center mr-5">
          <div className="mr-2 text-sm">
            <svg className="w-5 h-5 shadow-lg text-white/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
          </div>
          <div className="text-xs font-normal text-white/50">{comments}</div>
        </div>
      )}

      {/* 좋아요 */}
      {likes >= 0 && (
        <div comment-id={commentId} onClick={onClickLike ? onClickLike : onClickCommentLike} className={`w-1/2 flex items-center cursor-pointer ${reply ? "justify-end" : "justify-center"}`}>
          <div className="mr-2 text-sm">
            <svg id="like" className={`w-5 h-5 shadow-lg ${isLiked ? "text-white" : "text-white/50"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
            </svg>
          </div>
          <div className={`text-xs font-normal ${isLiked ? "text-white" : "text-white/50"}`}>{likes}</div>
        </div>
      )}
    </>
  );
}

export default PostBottom;