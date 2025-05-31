import { Link } from "react-router-dom";

//Components
import Form from "./Form";

// Images
import verification from "/verification.jpg"
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
                    <h1 className="font-light text-xl md:text-2xl xl:text-3xl">Verify Your account</h1>
                    <p className="md:text-base xl:text-lg sm"> Six (6) Digits Email Verification</p>
                </div>
                <Form />
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={verification} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
}

export default Index;