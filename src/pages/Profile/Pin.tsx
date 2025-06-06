import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-fox-toast";

//Services
import { useUpdateUserProfile } from "@/services/mutations.service";

//Component
import Button from "@/components/Button";

//Icons
import { Lock1 } from "iconsax-react";

const Pin = ({ encryptedPassword, email }: { encryptedPassword: string, email: string }) => {

    const [newPin, setNewPin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setIsLoading] = useState<boolean>(false);

    //Functions
    const reset = () => {
        setPassword("");
        setNewPin("")
        setIsLoading(false);
    }


    const updateUserDetails = useUpdateUserProfile();
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        if(newPin.length < 6) return toast.warning("Your new pin must be six(6) digits")
        if (encryptedPassword !== password) return toast.error("Incorrect Password, kindly try again.");
        setIsLoading(true);

        const payload = { email, transactionPin: newPin };
        updateUserDetails.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your Transaction Pin was updated successfully!")
                reset()
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't update your transaction pin now, kindly try again later.";
                toast.error(message);
                reset();
            },
        })
    };

    return (
        <main className="flex justify-center items-center bg-black px-4 rounded-xl min-h-[75vh] text-neutral-100">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-y-6 bg-lightBlack shadow-xl px-6 py-8 rounded-xl w-full max-w-md">
                <div className="text-center">
                    <h2 className="font-semibold text-lg md:text-xl xl:text-2xl">Change Transaction PIN</h2>
                    <p className="mt-1 text-neutral-400">Please confirm your password and enter a new PIN.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password" className="font-medium">Confirm Password</label>
                        <input id="password" type="password" value={password} placeholder="Confirm Your Password" onChange={(e) => setPassword(e.target.value)} className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary" required />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="newPin" className="font-medium">New PIN</label>
                        <input id="newPin" type="text" inputMode="numeric" value={newPin} placeholder="New Pin"
                            onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setNewPin(digitsOnly);
                            }}
                            className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary" required />
                    </div>

                    <Button icon={<Lock1 size="20" variant="Bold" />} loading={loading} disabled={loading} text="Submit" variant="success" />
                </form>
            </motion.div>
        </main>
    );
};

export default Pin;
