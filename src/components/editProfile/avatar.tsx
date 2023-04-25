import Image from "next/image";

interface AvatarProps {
  index: number;
  fileName: string;
  avatarRegister: any;
  disabled?: boolean;
  disableImage?: boolean;
}

const Avatar = ({
  index,
  fileName,
  avatarRegister,
  disabled,
  disableImage,

}: AvatarProps) => {
  return (
    <label
      htmlFor={fileName}
      className="w-[25%] cursor-pointer relative"
    >
      <input
        {...avatarRegister}
        type="radio"
        name="avatar"
        id={fileName}
        value={fileName}
        disabled={disabled}
        className="hidden"
      />
      <Image
        src={`/images/avatar/${fileName}.png`}
        width={60}
        height={60}
        alt={`user_avatar_${index}`}
        className={`mx-auto mt-2 mb-7 border border-gray-800 rounded-full ${disableImage && "brightness-50"}`}
      />
    </label>
  );
}

export default Avatar;