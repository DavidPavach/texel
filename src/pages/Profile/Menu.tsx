import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Utils
import { clearTokens } from "@/lib/token";

//Icons and Images
import { Shield, CreditCard, LogOut } from "lucide-react";
import { Key, Profile } from "iconsax-react";
import profileDefault from "/profile.jpeg";

type MenuItem = {
    id: string
    label: string
    icon: React.ReactNode
    onClick: () => void
    variant?: "default" | "danger"
}

export default function Menu({ user }: { user: User }) {

    //States
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    //Functions
    const toggleLoggingOut = () => setIsLoggingOut((prev) => !prev);

    const loggingOut = () => {
        toggleLoggingOut();
        setTimeout(() => clearTokens(), 1000);
        toggleLoggingOut();
        navigate("/login");
    }

    const menuItems: MenuItem[] = [
        {
            id: "profile",
            label: "Profile",
            icon: <Profile size={24} />,
            onClick: () => navigate(`/user/account?page=profile`),
        },
        {
            id: "kyc",
            label: "KYC",
            icon: <Shield size={24} />,
            onClick: () => navigate(`/user/account?page=kyc`),
        },
        {
            id: "card",
            label: "Card",
            icon: <CreditCard size={24} />,
            onClick: () => navigate(`/user/account?page=card`),
        },
        {
            id: "transaction-pin",
            label: "Transaction Pin",
            icon: <Key size={24} />,
            onClick: () => navigate(`/user/account?page=pin`),
        },
    ]

    return (
        <div className="shadow-xl pb-6 border border-neutral-800 rounded-xl overflow-hidden text-neutral-100">

            <div className="flex flex-col items-center bg-gradient-to-r from-primary/30 to-yellow-700 p-4 border-neutral-800 border-b">
                <div className="relative">
                    <div className="rounded-full size-12 md:size-14 xl:size-16 overflow-hidden">
                        <img src={user.profilePicture ?? profileDefault} alt={user.userName} className="w-full h-full object-cover" />
                    </div>
                    <div className="right-1 bottom-0.5 absolute bg-green-600 rounded-full size-2"></div>
                </div>
                <p className="font-semibold text-neutral-100 text-sm md:text-base xl:text-lg">{user.userName}</p>
                <p className="text-neutral-400">{user.email}</p>
            </div>

            <div className="p-4">
                <h3 className="mb-4 font-semibold text-white text-lg">Menu</h3>

                <div className="gap-4 grid grid-cols-2 mb-4">
                    {menuItems.map((item) => (
                        <button key={item.id} onClick={item.onClick}
                            className="group flex flex-col items-center gap-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] p-4 rounded-xl hover:scale-105 transition-all duration-200">
                            <div className="flex justify-center items-center bg-white/10 group-hover:bg-white/20 rounded-full w-12 h-12 text-gray-300 group-hover:text-white transition-all">
                                {item.icon}
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-white text-sm text-center transition-colors">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
                <button onClick={loggingOut}
                    className="group flex justify-center items-center gap-3 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-50 mt-10 p-4 border border-red-500/20 hover:border-red-500/40 rounded-xl w-full transition-all duration-200 disabled:cursor-not-allowed">
                    {isLoggingOut ? (
                        <>
                            <svg className="w-5 h-5 text-red-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="font-medium text-red-400">Logging out...</span>
                        </>
                    ) : (
                        <>
                            <LogOut size={20} className="text-red-400 group-hover:text-red-300 transition-colors" />
                            <span className="font-medium text-red-400 group-hover:text-red-300 transition-colors">Log Out</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
