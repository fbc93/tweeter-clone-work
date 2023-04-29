import AppBar from "../basic/appbar";
import DepthAppBar from "../basic/depthappbar";
import NavBar from "../basic/navbar";
import Seo from "../basic/seo";

interface LayoutProps {
  children: React.ReactNode;
  seoTitle: string;
  depthAppbarLeft: boolean;
  depthAppbarRight: boolean;
  depthAppbarTitle?: string;
  depthAppbarBgColor?: string;
  backIcon?: boolean;
  closeIcon?: boolean;
  depthAppbar?: boolean;
  removeNavbar?: boolean;
  blankArea?: boolean;
}

const Layout = ({
  children,
  seoTitle,
  depthAppbarLeft,
  depthAppbarRight,
  depthAppbarTitle,
  depthAppbarBgColor,
  backIcon,
  closeIcon,
  depthAppbar,
  removeNavbar,
  blankArea

}: LayoutProps) => {
  return (
    <>
      <div className="w-container h-full mx-auto bg-black max-sm:w-full">
        <Seo title={seoTitle} />
        {depthAppbar ?
          <DepthAppBar
            depthAppbarLeft={depthAppbarLeft}
            depthAppbarRight={depthAppbarRight}
            depthAppbarTitle={depthAppbarTitle}
            depthAppbarBgColor={depthAppbarBgColor}
            backIcon={backIcon}
            closeIcon={closeIcon}
            blankArea={blankArea}
          /> :
          <AppBar />
        }
        {children}
      </div>
      {removeNavbar ? null : <NavBar />}
    </>
  );
}

export default Layout;