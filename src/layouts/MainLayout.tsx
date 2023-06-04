import NavbarNewComp from "~/components/NavbarNew";
import { NextPage } from "next";

interface Props {
    children: React.ReactNode;
}

const MainLayout: NextPage<Props> = ({ children }) => {
    return (
        <>
            <div className="h-screen">
            <NavbarNewComp />
                <div className="flex flex-col py-4">
                    { children } 
                </div>
            </div>
        </>
    );
};
export default MainLayout;