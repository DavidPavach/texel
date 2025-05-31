import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Utils and Stores
import { getAccessToken } from "@/lib/token";

// Components
import SideBarNav from "@/components/SideBarNav";
import BottomNavBar from "@/components/BottomNav";
import Header from "@/components/Header";

const UserLayout = ({ children }: { children: React.ReactNode }) => {

    //Hooks
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = getAccessToken();
        const tokensPresent = accessToken !== null && accessToken !== undefined;

        if (!tokensPresent) {
            const currentPath = encodeURIComponent(location.pathname);
            navigate(`/login?redirect=${currentPath}`);
        }
    }, [navigate, location]);

    return (
        <main className="bg-lightBlack min-h-dvh overflow-y-auto grotesk">
            <SideBarNav />
            <main className="mainWidth">
                <Header />
                <div className="mb-20 lg:mb-0 px-2 md:px-4 py-4">
                    {children}
                </div>
            </main>
            <BottomNavBar />
        </main>
    );
};

export default UserLayout;
