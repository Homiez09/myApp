import NavbarComp from "~/components/Navbar";
import { NextPage } from "next";

interface Props {
    children: React.ReactNode;
}

const MainLayout: NextPage<Props> = ({ children }) => {
    return (
        <div className="h-screen">
            <NavbarComp />
            { children }
        </div>
    );
};

export default MainLayout;