import Link from "next/link";

const ContentBox = ({ title, link, linkText }: { title: string; link: string; linkText: string; }) => {
  return (
    <>
      <div>{title}</div>
      <Link href={link}>{linkText}</Link>
    </>
  );
}

export default ContentBox;