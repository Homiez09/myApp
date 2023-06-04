import { type NextPage } from "next";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("~/layouts/MainLayout"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        HELLO
        
      </MainLayout>
    </>
  );
};

export default Home;