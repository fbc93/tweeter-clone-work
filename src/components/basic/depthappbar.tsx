import DepthTitle from "./depthTitle";

const DepthAppBar = () => {
  const historyBack = () => {
    window.history.back();
  }
  return (
    <header className="text-white fixed top-0 left-0 z-100 w-full bg-accentSecond drop-shadow-lg">

      <nav className="w-container mx-auto h-appbar flex justify-between items-center px-[20px] box-border">
        <div onClick={historyBack} className="cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
          </svg>
        </div>
        <DepthTitle title="User Information" />
        <div className="text-transparent w-6 h-6">back</div>
      </nav>

    </header>
  );
}

export default DepthAppBar;