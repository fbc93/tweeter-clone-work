import Image from "next/image";
import Link from "next/link";
import useUser from "@src/libs/client/useUser";
import { useEffect } from "react";

const UserProfile = ({ link }: { link: string }) => {

  const { user } = useUser();

  return (
    <Link href={link} className="w-9 h-9 rounded-full shadow-lg overflow-hidden">
      {user && (
        user.avatar.startsWith('avatar_') && (
          <Image
            blurDataURL={`/images/avatar/${user.avatar}.png`}
            src={`/images/avatar/${user.avatar}.png`}
            width={36}
            height={36}
            className="aspect-square"
            alt="user profile"
          />
        ))}

      {user && (
        !user.avatar.startsWith('avatar_') && (
          <Image
            blurDataURL={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user.avatar}/avatar`}
            src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user.avatar}/avatar`}
            width={36}
            height={36}
            className="aspect-square"
            alt="user profile"
          />
        ))}
    </Link>
  );
}

export default UserProfile;