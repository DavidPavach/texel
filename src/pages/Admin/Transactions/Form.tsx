import { useSearchUser } from "@/services/queries.service";
import { useState } from "react";
import { toast } from "react-fox-toast";

//Enums, Hooks and Functions
import { getWallet, TransactionCoin } from "@/enums";
import { useAdminCreateTransaction } from "@/services/mutations.service";
import { generateWalletAddress } from "@/utils/generate";

//Icons
import { CloseCircle, Refresh2 } from "iconsax-react";

const Form = ({ toggleOpen }: { toggleOpen: () => void }) => {

    const [searchValue, setSearchValue] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const { data, isLoading, error } = useSearchUser(searchValue);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        coin: '',
        transactionType: 'sent',
        amount: 0,
        status: 'pending',
    });

    //Functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value,
        }));
    };

    const isFormValid = (data: typeof formData) => {
        if (!data.coin.trim()) return false;
        if (!data.transactionType.trim()) return false;
        if (!data.status.trim()) return false;
        if (isNaN(data.amount) || data.amount <= 0) return false;

        return true;
    };

    const resetForm = () => {
        setFormData({
            coin: '',
            transactionType: 'sent',
            amount: 0,
            status: 'pending',
        });
        setSelectedUserId(null);
        toggleOpen()
    };

    const createTransaction = useAdminCreateTransaction()
    const submit = () => {
        if (!isFormValid(formData)) {
            toast.info('Please fill in all required fields correctly.');
            return;
        }
        if (!selectedUserId) return toast.error("Kindly select a user before proceeding.")

        const walletAddress = generateWalletAddress(formData.coin);
        setIsSubmitting(true)
        createTransaction.mutate({ ...formData, walletAddress, user: selectedUserId, network: getWallet[formData.coin].network }, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your transaction was created successfully!");
                resetForm();
                setIsSubmitting(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transaction creation failed, kindly try again.";
                toast.error(message);
                resetForm();
                setIsSubmitting(false);
            },
        })
    }

    return (
        <main className="z-30 fixed inset-0 flex justify-center items-center bg-black/90 p-4 text-neutral-100">
            <section className="relative bg-lightBlack px-4 py-8 border border-neutral-800 rounded-xl w-full max-w-2xl">
                <CloseCircle onClick={toggleOpen} variant="Bold" size={24} className="top-4 right-4 absolute text-red-600 hover:text-red-800 duration-300 cursor-pointer" />
                {!selectedUserId ? (
                    <>
                        <div className="flex flex-col gap-y-1 mt-4">
                            <label htmlFor="search">Search User by Email, AccountId or UserName</label>
                            <input type="search" id="search" className="bg-black px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full duration-300 focus:caret-primary" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </div>
                        {isLoading && <p className="mt-4">Searching...</p>}
                        {searchValue.length > 5 && error && <p className="mt-4 text-red-500">Search failed</p>}
                        {!error && searchValue.length > 5 && data && (
                            <ul className="space-y-2 mt-4">
                                {(Array.isArray(data.data) ? data.data : [data.data]).map((user: User) => (
                                    <li key={user.accountId}
                                        onClick={() => { setSelectedUserId(user._id); setSearchValue('') }} className="hover:bg-neutral-800 p-2 rounded-md cursor-pointer">
                                        <p>{user.userName} - {user.email}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ) : (
                    <div className="flex justify-between items-center bg-accent mt-4 p-3 rounded-md text-white">
                        {(() => {
                            const users = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];
                            const selectedUser = users.find((user: User) => user._id === selectedUserId);
                            return (<p>{selectedUser ? `${selectedUser.userName} - ${selectedUser.email}` : 'Unknown'} </p>);
                        })()}
                        <button className="hover:-rotate-90 duration-300" onClick={() => { setSelectedUserId(null); setSearchValue('') }}> <Refresh2 variant="Bold" size={18} /> </button>
                    </div>
                )}
                <div className="my-4">
                    <label className="block mb-1">Coin</label>
                    <select name="coin" value={formData.coin} onChange={handleChange} className="bg-black px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full duration-300 focus:caret-primary">
                        <option value="">Select Coin</option>
                        {Object.values(TransactionCoin).map((coin) => (
                            <option key={coin} value={coin} className="capitalize">{coin}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Transaction Type</label>
                    <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="bg-black px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full duration-300 focus:caret-primary">
                        <option value="sent">Sent</option>
                        <option value="received">Received</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Amount</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="bg-black px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full duration-300 focus:caret-primary" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="bg-black px-4 py-3 rounded-xl focus:outline-1 focus:outline-none focus:outline-primary w-full duration-300 focus:caret-primary">
                        <option value="successful">Successful</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <button type="button" onClick={submit} disabled={isSubmitting}
                    className="flex justify-center items-center bg-accent hover:bg-accent/70 disabled:bg-neutral-700 px-4 py-3 rounded-lg w-full font-medium text-white disabled:text-neutral-400 transition-colors duration-300">
                    {isSubmitting ? (
                        <>
                            <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        "Confirm Transfer"
                    )}
                </button>
            </section>
        </main>
    );
};

export default Form;
