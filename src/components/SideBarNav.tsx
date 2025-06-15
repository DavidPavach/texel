import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

//Utils
import { clearTokens } from "@/lib/token";

//Components
import SideItem from "./SideBarItem";

//Icons
import { Discover, MoneyRecive, Profile, Home2, Link2, Logout } from "iconsax-react";

const navItems = [
    { href: "/user/dashboard", icon: Home2, label: "Home" },
    { href: "/user/buy", icon: MoneyRecive, label: "Buy" },
    { href: "/user/discover", icon: Discover, label: "Discover" },
    { href: "/user/connect", icon: Link2, label: "Connect" },
    { href: "/user/account", icon: Profile, label: "Account" },
];

const logoutItem = { href: "", icon: Logout, label: "Logout" };

const SideBar = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    //Functions
    const handleLogOut = () => {
        toast.info("Logging you out...")
        clearTokens();
        setTimeout(() => navigate("/login"), 1000)
    }

    return (
        <main className="hidden fixed lg:flex flex-col bg-[#000000] px-10 py-6 w-[20rem] h-dvh text-[#c8c8c9]">
            <div className="flex flex-col flex-grow gap-y-8 mt-20">
                {navItems.map((item, index) => (
                    <SideItem key={`items-${index}`} currentPath={pathname} {...item} />
                ))}
            </div>
            <div className="mt-8" onClick={handleLogOut}>
                <SideItem currentPath={pathname} {...logoutItem} />
            </div>
        </main>
    );
};

export default SideBar;