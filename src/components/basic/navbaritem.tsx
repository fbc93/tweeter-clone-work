import Link from "next/link";
import { useRouter } from "next/router";

interface NavbarItemProps {
  link?: string;
  SvgPath: string;
  content: string;
  onClick?: (event: any) => void;
  activeStyle?: string;
}

const NavbarItem = ({
  link,
  SvgPath,
  content,
  onClick,
  activeStyle
}: NavbarItemProps) => {

  return (
    <li className={`mx-3 ${activeStyle}`}>
      <Link href={link ? link : ""} onClick={onClick}>
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={SvgPath}
          />
        </svg>
        <span className="text-xs mt-2 block">{content}</span>
      </Link>
    </li >
  );
}

export default NavbarItem;