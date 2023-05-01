import Layout from "@src/components/layout/main";
import Image from "next/image";

const Mylog = () => {

  return (
    <Layout
      seoTitle="마이로그"
      depthAppbarLeft={true}
      depthAppbarRight={true}
      depthAppbarTitle="My Log"
      depthAppbarBgColor=""
      depthAppbar={true}
      backIcon={true}
      removeNavbar={false}
    >
      <div className="w-full h-[150px] bg-gray-700 brightness-[40%] overflow-hidden">
        <Image
          width={320}
          height={320}
          src="/images/mylog/MyLog_bg_01.jpg"
          alt="mylog background"
          className="w-full"
        />
      </div>
      <div className="w-20 h-20 rounded-full bg-gray-500 border-[7px] border-black overflow-hidden "></div>
    </Layout>
  );
}

export default Mylog;