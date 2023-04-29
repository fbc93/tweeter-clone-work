import Logo from "./logo";
import UserProfile from "./userprofile";

const AppBar = () => {
  return (
    <header className="text-white fixed top-0 left-0 z-100 w-full bg-accentSecond drop-shadow-lg">
      <nav className="w-container mx-auto h-appbar flex justify-between items-center px-[20px] box-border">
        <Logo link="/" />
        <UserProfile link="/profile/edit" />
      </nav>
    </header>
  );
}

export default AppBar;