import { type NextPage } from "next";
import NewTwootForm from "~/components/twootor/NewTwootForm";
import RecentTwoots from "~/components/twootor/RecentTwoots";
import { Navbar } from "@nextui-org/react";
import dynamic from "next/dynamic";

const TwootLayout = dynamic(() => import("~/layouts/TwootLayout"), {
    ssr: false,
  });

const twootor: NextPage = () => {
    return (
        <>
            <TwootLayout>
                <Navbar isBordered variant={"sticky"}>
                    <Navbar.Content enableCursorHighlight hideIn={"md"}>
                    <h3>Home</h3>
                    </Navbar.Content>
                </Navbar>
                <NewTwootForm />
                <RecentTwoots />
            </TwootLayout>
        </>
    )
}

export default twootor;