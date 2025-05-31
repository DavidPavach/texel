import { useLocation } from "react-router-dom";

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

const logoutItem = { href: "/logout", icon: Logout, label: "Logout" };

const SideBar = () => {

    const { pathname } = useLocation();

    return (
        <main className="hidden fixed lg:flex flex-col bg-[#000000] px-10 py-6 w-[20rem] h-dvh text-[#c8c8c9]">
            <div className="flex flex-col flex-grow gap-y-8 mt-20">
                {navItems.map((item, index) => (
                    <SideItem key={`items-${index}`} currentPath={pathname} {...item} />
                ))}
            </div>
            <div className="mt-8">
                <SideItem currentPath={pathname} {...logoutItem} />
            </div>
        </main>
    );
};

export default SideBar;