import { NextPage } from "next";
import SideNavbarComp from "~/components/twootor/SideNavbar";

interface Props {
    children: React.ReactNode;
}

const TwootLayout: NextPage<Props> = ({ children }) => {
    return (
        <>
            <div className="container mx-auto flex">
            <SideNavbarComp />
                <div className="min-h-screen flex-grow">
                    { children } 
                </div>
            </div>
        </>
    );
};

export default TwootLayout;