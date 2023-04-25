import Body from "@src/components/layout/body";
import Layout from "@src/components/layout/main";
import useUser from "@src/libs/client/useUser";
import { NextPage } from "next";

const Home: NextPage = () => {

  const { user, isLoading } = useUser();

  return (
    <Layout seoTitle="HOME">
      <Body>
        <h1>Home</h1>
      </Body>
    </Layout>
  )
}

export default Home;