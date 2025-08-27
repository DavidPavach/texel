//Services
import { GetCardRequest } from "@/services/queries.service";

//Component
import CardForm from "./CardForm";
import ErrorDisplay from "@/components/Error";
import CardAccepted from "./CardAccepted";
import CardRejected from "./CardRejected";

//Icons
import { CheckCircle, X } from "lucide-react";

const Card = () => {

    const { data, isFetching, isLoading, isError, refetch } = GetCardRequest();

    if (isLoading || isFetching) {
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

    if (isError) {
        return (
            <ErrorDisplay onRetry={refetch} isFullPage={false} title="Card Page Failed" message="We couldn't load your card page data. Click below to try again." retryLabel="Reload Card Page" />
        );
    }
    return (
        <main className="flex md:flex-row flex-col md:justify-between gap-y-5 mt-10">
            <div className="w-full md:w-[45%] lg:w-[48%]">
                {!data.data || data.data === null ? <CardForm hasApplied={false} />
                    : data.data.status === "pending" ? <CardForm hasApplied={true} />
                        : data.data.status === "successful" ? <CardAccepted cardNumber={data.data.cardNumber} expiryDate={data.data.cardExpiryDate} cardCVV={data.data.cardCVV} />
                            : data.data.status === "declined" ? <CardRejected /> : <CardForm hasApplied={false} />
                }

            </div>
            <div className="w-full md:w-[45%] lg:w-[48%] text-neutral-100">
                {(!data.data || data.data === null) || data.data.status === "pending" ?
                    <div className="bg-black px-4 py-8 border border-neutral-800 rounded-xl">
                        <h2 className="mb-4 font-bold text-base md:text-lg xl:text-xl">How it Works</h2>
                        <div className="space-y-4 text-neutral-300">
                            <div className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-0.5 rounded-full size-5 font-bold text-black">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm md:text-base xl:text-lg">Apply for Card</h3>
                                    <p className="text-neutral-400">Click the apply button to start your card application process.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-0.5 rounded-full size-5 font-bold text-black">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm md:text-base xl:text-lg">Make Required Payment</h3>
                                    <p className="text-neutral-400">View the payment details, read the instructions and send the required amount.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-0.5 rounded-full size-5 font-bold text-black">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm md:text-base xl:text-lg">Check the Checkbox</h3>
                                    <p className="text-neutral-400">Check the box after payment in order to be able to submit your application.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    : data.data.status === "successful" ?
                        <div className="bg-black px-4 py-8 border border-neutral-800 rounded-xl">
                            <p className="text-neutral-400">Card Status Summary</p>
                            <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl"><CheckCircle className="inline text-green-400" /> Verified</h1>
                            <div className="flex items-start gap-3 mt-10">
                                <div className="flex flex-shrink-0 justify-center items-center bg-primary mt-0.5 p-1 rounded-full size-6 font-bold text-black">
                                    <CheckCircle />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm md:text-base xl:text-lg">Make Payment</h3>
                                    <p className="text-neutral-400">You can now make virtual payment using the card. Contact Support for more details.</p>
                                </div>
                            </div>
                        </div>
                        : <div className="bg-black px-4 py-8 border border-neutral-800 rounded-xl">
                            <p className="text-neutral-400">Card Status Summary</p>
                            <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl"><X className="inline text-red-600" /> Declined</h1>
                        </div>
                }


            </div>
        </main >
    )
}

export default Card;