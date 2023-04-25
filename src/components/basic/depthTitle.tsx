import Image from "next/image";
import logo from "@public/images/logo.png";

const DepthTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-baseline">
      <Image
        src={logo}
        width={25}
        height={25}
        alt="logo"
        className="shadow-lg"
      />
      <span className="font-Pacifico text-lg text-white drop-shadow-lg inline-block">{title}</span>
    </div>
  );
}

export default DepthTitle;