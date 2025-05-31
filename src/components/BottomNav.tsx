import { useLocation } from "react-router-dom";

//Components
import NavItem from "./BottomNavItem";

//Icons
import { Discover, WalletAdd, Profile, Home2, Link2 } from "iconsax-react";

const navItems = [
  { href: "/user/buy", icon: WalletAdd, label: "Buy" },
  { href: "/user/discover", icon: Discover, label: "Discover" },
  { href: "/user/dashboard", icon: Home2, label: "Home" },
  { href: "/user/connect", icon: Link2, label: "Connect" },
  { href: "/user/account", icon: Profile, label: "Account"},
];

const BottomNav = () => {

  const { pathname } = useLocation();

  return (
    <main className="lg:hidden bottom-0 left-0 z-50 fixed bg-[#F0F0F0] p-2 w-full">
      <div className="flex justify-between items-center bg-black p-2 rounded-[2rem]">
        {navItems.map((item) => (
          <NavItem key={item.label} currentPath={pathname} {...item} />
        ))}
      </div>
    </main>
  );
};

export default BottomNav;