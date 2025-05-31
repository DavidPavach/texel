//Services
import { GetCardRequest } from "@/services/queries.service";

//Component
import CardForm from "./CardForm";
import ErrorDisplay from "@/components/Error";

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
                <CardForm hasApplied={data.data !== null} />
            </div>
            <div className="w-full md:w-[45%] lg:w-[48%] text-neutral-100">
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
            </div>
        </main >
    )
}

export default Card;