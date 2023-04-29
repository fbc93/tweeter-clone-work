import Image from "next/image";


interface DepthTitleProps {
  depthAppbarTitle?: string;
}

const DepthTitle = ({ depthAppbarTitle }: DepthTitleProps) => {
  return (
    <div className="flex justify-center items-baseline">
      <span className="font-Pacifico text-2xl text-white drop-shadow-lg inline-block">{depthAppbarTitle}</span>
    </div>
  );
}

export default DepthTitle;