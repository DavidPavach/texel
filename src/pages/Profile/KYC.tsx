//Component
import Kyc from "../Kyc/Form";
import Done from "./Done";

//Icons
import { Information } from "iconsax-react";

const KYC = ({ user }: { user: User }) => {
    return (
        <main>
            {user.kyc && user.kyc.status === "rejected" && (
                <div className="mx-auto max-w-3xl">
                    <div className="flex gap-x-1 text-neutral-300">
                        <Information variant="Bulk" size={24} className="text-primary animate-bounce shrink-0" />
                        <h1 className="text-sm md:text-base xl:text-lg text-center">We regret to inform you that your previous KYC submission was rejected. To avoid any disruption to your account, please resubmit the required documentation at your earliest convenience.</h1>
                    </div>
                    <Kyc />
                </div>
            )}
            {user.kyc && (user.kyc.status === 'pending' || !user.kyc.status) && (
                <Done variant="warning" heading="KYC Verification Pending" idType={user.kyc.idType} gender={user.gender ?? "No gender specified"} images={user.kyc.images} />)}

            {user.kyc && user.kyc.status === 'accepted' && (
                <Done variant="success" heading="KYC Verified" idType={user.kyc.idType} gender={user.gender ?? "No gender specified"} images={user.kyc.images} />
            )}

        </main>
    );
}

export default KYC;