import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Utils and Stores
import { getAdminAccessToken } from "@/lib/token";

// Components
import AdminSideBar from "@/components/AdminSideBar";
import AdminBottomBar from "@/components/AdminBottomBar";
import AdminHeader from "@/components/AdminHeader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    //Hooks
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = getAdminAccessToken();
        const tokensPresent = accessToken !== null && accessToken !== undefined;

        if (!tokensPresent) {
            const currentPath = encodeURIComponent(location.pathname);
            navigate(`/operations?redirect=${currentPath}`);
        }
    }, [navigate, location]);

    return (
        <main className="bg-lightBlack min-h-dvh overflow-y-auto grotesk">
            <AdminSideBar />
            <main className="mainWidth">
                <AdminHeader />
                <div className="mb-20 lg:mb-0 px-2 md:px-4 py-4">
                    {children}
                </div>
            </main>
            <AdminBottomBar />
        </main>
    );
};

export default AdminLayout;
