import { useLocation } from "react-router-dom";

//Components
import NavItem from "./BottomNavItem";

//Icons
import { Profile2User, MoneyChange, Key, Setting2, CardReceive } from "iconsax-react";

const navItems = [
  { href: "/admin/transactions", icon: MoneyChange, label: "Transactions" },
  { href: "/admin/users", icon: Profile2User, label: "Users" },
  { href: "/admin/settings", icon: Setting2, label: "Settings" },
  { href: "/admin/card", icon: CardReceive, label: "Card Request" },
  { href: "/admin/admins", icon: Key, label: "Staff"},
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