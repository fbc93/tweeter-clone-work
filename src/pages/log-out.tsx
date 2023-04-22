import IntroLayout from "@src/components/layout/intro";
import Link from "next/link";

const Logout = () => {
  return (
    <IntroLayout seoTitle="로그아웃">
      <div>다음에 다시봐요!</div>
      <Link href="/log-in">다시 로그인</Link>
    </IntroLayout>
  );
}

export default Logout;