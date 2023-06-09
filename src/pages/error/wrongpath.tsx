import Link from "next/link";

const WrongPath = () => {
  return (
    <div className="text-white">
      <h1>잘못된 경로입니다.</h1>
      <p>로그인하거나 회원가입해주세요.</p>
      <Link href="/log-in">로그인</Link>
      <Link href="/create-account">회원가입</Link>
    </div>
  )
}

export default WrongPath;