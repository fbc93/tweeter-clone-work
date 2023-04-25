import AppBar from "../basic/appbar";
import DepthAppBar from "../basic/depthappbar";
import NavBar from "../basic/navbar";
import Seo from "../basic/seo";

interface LayoutProps {
  children: React.ReactNode;
  seoTitle: string;
  hasBackBtn?: boolean;
  removeNavbar?: boolean;
}

const Layout = ({ children, seoTitle, hasBackBtn, removeNavbar }: LayoutProps) => {
  return (
    <>
      <div className="w-container h-full mx-auto bg-black max-sm:w-full">
        <Seo title={seoTitle} />
        {hasBackBtn ? <DepthAppBar /> : <AppBar />}
        {children}
      </div>
      {removeNavbar ? null : <NavBar />}
    </>
  );
}

export default Layout;