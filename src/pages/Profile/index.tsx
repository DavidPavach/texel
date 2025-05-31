import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

//Stores and Services
import { useUserStore } from "@/stores/userStore";
import { GetUserDetails } from "@/services/queries.service";

//Components
import ErrorDisplay from "@/components/Error";
import Menu from "./Menu";
import Profile from "./Profile";
import KYC from "./KYC";
import Pin from "./Pin";
import Card from "./Card";

const Index = () => {

    const { user, setUser } = useUserStore();
    const [searchParams] = useSearchParams();
    const { data, isLoading, isError, refetch } = GetUserDetails();
    const page = searchParams.get("page");

    useEffect(() => {
        if (!user && data?.data) {
            setUser(data.data);
        }
    }, [data, user, setUser]);
    
    if (isLoading) {
        return (
            <div className="flex flex-col gap-y-5 mt-10 px-4 pb-4">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                        <div className="bg-neutral-800 rounded-full size-8 animate-pulse"></div>
                        <div className="flex-1">
                            <div className="bg-neutral-800 rounded w-full h-4 animate-pulse"></div>
                            <div className="bg-neutral-800 mt-2 rounded w-[80%] h-3 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError || !user) {
        return (
            <ErrorDisplay onRetry={refetch} isFullPage={false} title="Profile Page Failed" message="We couldn't load your profile page data. Click below to try again." retryLabel="Reload" />
        );
    }
    
    return page === "profile" ? <Profile user={user} /> : page === "kyc" ? <KYC user={user} /> : page === "pin" ? <Pin encryptedPassword={user.encryptedPassword} email={user.email} /> : page === "card" ? <Card /> : <Menu user={user} />;
};

export default Index;
