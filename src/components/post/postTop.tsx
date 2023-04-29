import { calcDateFromNow } from "@src/libs/client/utils";

interface PostTopProps {
  author: string;
  createdAt: Date;
}

const PostTop = ({ author, createdAt }: PostTopProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <div className="text-sm text-white font-normal">{author}</div>
      </div>
      <div className="flex items-center">
        <span className="inline-block text-xs mr-[4px]">
          <svg className="w-3 h-3 shadow-lg text-white/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"></path>
          </svg>
        </span>
        <span className="inline-block text-xs text-white/50 font-thin">{calcDateFromNow(createdAt)}</span>
      </div>
    </div>
  );
}

export default PostTop;