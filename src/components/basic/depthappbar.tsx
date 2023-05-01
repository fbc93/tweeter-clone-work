import Image from "next/image";
import DepthTitle from "./depthTitle";
import { useRouter } from "next/router";
interface DepthAppBarProps {
  depthAppbarTitle?: string;
  depthAppbarLeft?: boolean;
  depthAppbarRight?: boolean;
  depthAppbarBgColor?: string;
  backIcon?: boolean;
  closeIcon?: boolean;
  blankArea?: boolean;
}

const DepthAppBar = ({
  depthAppbarTitle,
  depthAppbarLeft,
  depthAppbarRight,
  depthAppbarBgColor = "bg-accentSecond",
  backIcon,
  closeIcon,
  blankArea


}: DepthAppBarProps) => {
  const router = useRouter();
  const historyBack = () => {
    window.history.back();
  }

  const historyHome = () => {
    router.push("/");
  }

  return (
    <header className={`text-white fixed top-0 left-0 z-100 w-full  drop-shadow-lg ${depthAppbarBgColor} z-[100]`}>
      <nav className="w-container mx-auto h-appbar flex justify-between items-center px-[20px] box-border">

        {depthAppbarLeft && (
          <>
            {backIcon && (
              <div onClick={historyBack} className="cursor-pointer w-7 h-7 backdrop-blur-sm bg-black/60 rounded-full flex justify-center items-center shadow-lg">
                <svg className="w-3 h-3 text-white self-center" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                </svg>
              </div>
            )}
            {closeIcon && (
              <div onClick={historyHome} className="cursor-pointer w-7 h-7 backdrop-blur-sm bg-black/60 rounded-full flex justify-center items-center shadow-lg">
                <svg className="w-3 h-3 text-white self-center" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
                </svg>
              </div>
            )}
          </>
        )}
        <DepthTitle depthAppbarTitle={depthAppbarTitle} />
        {depthAppbarRight && (
          <div className="w-7 h-7">
            <Image
              src="/images/logo.png"
              width={25}
              height={25}
              alt="logo"
              className="shadow-lg mr-2"
            />
          </div>
        )}

        {blankArea && (
          <div className="w-[28px] h-[28px] bg-transparent"></div>
        )}
      </nav>
    </header>
  );
}

export default DepthAppBar;