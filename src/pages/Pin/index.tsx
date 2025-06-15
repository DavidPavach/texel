import { Link } from "react-router-dom";
import { useEffect } from "react";

//Stores and Services
import { useUserStore } from "@/stores/userStore";
import { GetUserDetails } from "@/services/queries.service";

//Component
import Form from "./Form";

// Images
import setUp from "/set_up.svg";
import logo from "/logo.svg";

//Icons
import { Add } from "iconsax-react";
import ErrorDisplay from "@/components/Error";

const Index = () => {

    const { user, setUser } = useUserStore();
    const { data, isLoading, isError, refetch } = GetUserDetails();

    useEffect(() => {
        if (!user && data?.data) {
            setUser(data.data);
        }
    }, [data, user, setUser]);

    return (
        <main className="flex justify-center lg:justify-between items-center bg-brand-gradient min-h-dvh overflow-auto">
            <div className="lg:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 w-full lg:w-[40%]">
                <div className="bg-black p-2 rounded-xl size-fit">
                    <img src={logo} alt="Texel chain logo" className="w-4 md:w-6 xl:w-8" />
                </div>
                <div className="mt-4 text-neutral-700 text-center">
                    <h1 className="font-light text-xl md:text-2xl xl:text-3xl">Secure Transaction</h1>
                    <p className="text-sm md:text-base xl:text-lg">Create a new Transaction PIN to secure your account and Transactions.</p>
                </div>
                {isLoading && (
                    <div className="bg-neutral-800 mx-auto mt-2 rounded-2xl w-[90%] h-52 animate-pulse"></div>
                )}

                {isError &&
                    <ErrorDisplay onRetry={refetch} isFullPage={false} title="Transaction Pin Failed" message="We couldn't load your transaction pin page data. Click below to try again." retryLabel="Reload" />
                }
                {user && <Form email={user.email} />}
            </div>
            <div className="hidden lg:block relative p-2 w-[50%] h-dvh">
                <Link to="/" className="group top-8 right-8 z-[2] absolute place-items-center grid bg-white rounded-[50%] size-10">
                    <Add className="text-black group-hover:text-red-600 rotate-45 duration-300" size={30} />
                </Link>
                <img src={setUp} className="rounded-[2rem] w-full h-full object-center object-cover" />
            </div>
        </main>
    );
};

export default Index;
