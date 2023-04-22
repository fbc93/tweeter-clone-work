import Layout from "@src/components/layout/main";
import useUser from "@src/libs/client/useUser";
import { NextPage } from "next";

const Home: NextPage = () => {

  const { user, isLoading } = useUser();

  //console.log(user);

  return (
    <Layout seoTitle="HOME">
      <main className="text-white text-2xl text-center pt-[4rem] pb-[5rem] h-full">Home</main>
    </Layout>
  )
}

export default Home;