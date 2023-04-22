import Image from "next/image";
import Link from "next/link";
import profileImage from "@avatar/avatar_01.png";

const UserProfile = ({ link }: { link: string }) => {
  return (
    <Link href={link} className="w-9 h-9 rounded-full shadow-lg overflow-hidden">
      <Image src={profileImage} alt="user profile" />
    </Link>
  );
}

export default UserProfile;