import AppBar from "../basic/appbar";
import NavBar from "../basic/navbar";
import Seo from "../basic/seo";

interface LayoutProps {
  children: React.ReactNode;
  seoTitle: string;
}

const Layout = ({ children, seoTitle }: LayoutProps) => {
  return (
    <div className="w-container mx-auto h-screen bg-black relative drop-shadow-lg max-sm:w-full">
      <Seo title={seoTitle} />
      <AppBar />
      {children}
      <NavBar />
    </div>
  );
}

export default Layout;