import Seo from "../basic/seo";

interface IntroLayoutProps {
  children: React.ReactNode;
  seoTitle: string;
}

const IntroLayout = ({ children, seoTitle }: IntroLayoutProps) => {
  return (
    <main className="text-white">
      <Seo title={seoTitle} />
      {children}
    </main>
  );
}

export default IntroLayout;