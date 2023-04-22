import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/logo.png";

const Logo = ({ link }: { link: string }) => {
  return (
    <Link href={link} className="flex justify-center items-baseline">
      <Image
        src={logo}
        width={25}
        height={25}
        alt="logo"
        className="shadow-lg"
      />
      <span className="font-Pacifico text-lg text-white drop-shadow-lg inline-block">ShareMovie</span>
    </Link>
  );
}

export default Logo;