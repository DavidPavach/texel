import { Link, useSearchParams } from "react-router-dom";

//Components
import SendEmail from "./SendEmail";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";

// Images
import forgotPassword from "/forgot_password.svg";
import resetPassword from "/reset_password.jpg";
import logo from "/logo.svg";

//Icons
import { Add } from "iconsax-react";

const Index = () => {

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");


    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[40%]">
                <div className="bg-black p-2 rounded-xl size-fit">
                    <img src={logo} alt="Texel chain logo" className="w-4 md:w-6 xl:w-8" />
                </div>
                <div className="mt-4 text-neutral-700 text-center">
                    <h1 className="font-light text-xl md:text-2xl xl:text-3xl">{page === "verify" ? "Verify Email" : page === "reset" ? "Reset Password" : "Forgot Password"}</h1>
                    <p className="text-sm md:text-base xl:text-lg">Log in to continue</p>
                </div>
                {page === "verify" ? <VerifyEmail /> : page === "reset" ? <ResetPassword /> : <SendEmail />}
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-2 mt-10 text-neutral-600">
                    <p>New User?<Link to="/create" className="ml-1 text-neutral-900 hover:text-white underline duration-300">Create Account</Link></p>
                    <p>Already a User?<Link to="/login" className="ml-1 text-neutral-900 hover:text-white underline duration-300">Login Account</Link></p>
                </div>
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={page === "reset" ? resetPassword : forgotPassword} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
}

export default Index;