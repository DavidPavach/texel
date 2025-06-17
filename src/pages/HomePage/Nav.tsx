import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Images
import logo from "/logo.svg";

// Icons
import { CloseCircle, HambergerMenu } from "iconsax-react";

const PAGES = [
    { page: "Send & Receive", path: "/send" },
    { page: "Buy & Sell", path: "/buy" },
    { page: "Businesses", path: "/business" },
    { page: "About", path: "/about" },
];

const Buttons = [
    { page: "Log in", path: "/login" },
    { page: "Sign up", path: "/create" },
];

const Nav = () => {

    const { pathname } = useLocation();
    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen((prev) => !prev);
    const Icon = open ? CloseCircle : HambergerMenu;

    return (
        <nav className="relative xl:mx-auto xl:max-w-7xl grotesk">
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-16 xl:px-12 py-6">
                <div className="flex items-center gap-x-2">
                    <img src={logo} alt="TexelChain Logo" className="size-8 md:size-10 xl:size-12" />
                    <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">
                        TexelChain
                    </h2>
                </div>

                <div className="hidden md:flex gap-5 lg:gap-8">
                    {PAGES.map(({ page, path }) => (
                        <Link key={path} to={path} className={`text-sm lg:text-base transition-colors duration-300 hover:text-primary ${pathname === path ? "text-primary font-semibold" : ""}`}>
                            {page}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex gap-4">
                    {Buttons.map(({ page, path }, idx) => (
                        <Link key={path} to={path} className={`text-sm lg:text-base rounded-xl px-4 lg:px-8 py-2 transition duration-300 border border-primary ${idx === 1
                                    ? "bg-primary text-black hover:text-white hover:bg-primary/90 hover:scale-105s"
                                    : "text-primary hover:bg-primary/10"  }`}>
                            {page}
                        </Link>
                    ))}
                </div>

                <Icon onClick={toggleOpen} size="32" variant="Bold" className="md:hidden bg-white rounded-lg text-accent cursor-pointer" />
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden flex flex-col gap-4 px-4 sm:px-6 md:px-8 pt-4 pb-6 border border-neutral-800 rounded-lg">
                        {PAGES.map(({ page, path }) => (
                            <Link key={path} to={path} onClick={() => setOpen(false)} className={`block text-sm transition duration-300 hover:text-primary ${pathname === path ? "text-primary font-semibold" : ""}`}>
                                {page}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 mt-4">
                            {Buttons.map(({ page, path }, idx) => (
                                <Link key={path} to={path} onClick={() => setOpen(false)} className={`block text-center text-sm rounded-xl px-4 py-2 border border-primary transition duration-300 ${idx === 1 ? "bg-primary text-black hover:bg-primary/90 hover:text-white hover:scale-105" : "text-primary hover:bg-primary/10"}`}>
                                    {page}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Nav;
