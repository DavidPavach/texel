import { Link } from "react-router-dom";

//Component
import Form from "./Form";

// Images
import create from "/create.mp4"
import logo from "/logo.svg";

//Icons
import { Add } from "iconsax-react";

const Index = () => {
    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[40%]">
                <div className="bg-black p-2 rounded-xl size-fit">
                    <img src={logo} alt="Texel chain logo" className="w-4 md:w-6 xl:w-8" />
                </div>
                <div className="mt-4 text-neutral-700 text-center">
                    <h1 className="font-light text-xl md:text-2xl xl:text-3xl">Create an account</h1>
                    <p className="text-sm md:text-base xl:text-lg">Sign up to continue</p>
                </div>
                <Form />
                <div className="flex justify-between items-center mt-10 text-neutral-600">
                    <p>Already a user?<Link to="/login" className="ml-1 text-neutral-900 hover:text-white underline duration-300">Login</Link></p>
                </div>
            </div>
            <div className="relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <video src={create} autoPlay loop muted playsInline className="hidden lg:block rounded-[2rem] w-full h-full object-center object-cover" />
            </div>

        </main>
    );
};

export default Index;
