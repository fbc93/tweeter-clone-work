const Body = ({ children }: { children: React.ReactNode; }) => {
  return (
    <main className="w-container px-[20px] mx-auto text-white text-2xl text-center mt-[4rem] pb-[5rem]">
      {children}
    </main>
  );
}

export default Body;