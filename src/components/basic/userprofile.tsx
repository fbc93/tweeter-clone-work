import Image from "next/image";
import Link from "next/link";
import useUser from "@src/libs/client/useUser";

const UserProfile = ({ link }: { link: string }) => {

  const { user } = useUser();

  return (
    <Link href={link} className="w-9 h-9 rounded-full shadow-lg overflow-hidden">
      {user?.avatar.startsWith('avatar_') ? (
        <Image
          priority={true}
          src={`/images/avatar/${user.avatar}.png`}
          width={36}
          height={36}
          className="aspect-square"
          alt="user profile"
        />
      ) : (
        <Image
          priority={true}
          src={`https://imagedelivery.net/CjoAMvz9GcH3ptsdhIn6iw/${user?.avatar}/avatar`}
          width={36}
          height={36}
          className="aspect-square"
          alt="user profile"
        />
      )}
    </Link>
  );
}

export default UserProfile;