const Body = ({ children }: { children: React.ReactNode; }) => {
  return (
    <main className="w-container px-[20px] mx-auto text-white text-2xl text-center pt-[64px] pb-[5rem]">
      {children}
    </main>
  );
}

export default Body;