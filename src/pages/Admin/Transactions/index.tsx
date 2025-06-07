import { useEffect, useState } from "react";

//Stores
import { useAdminStore } from "@/stores/adminStore";

//Components
import Sent from "./Sent";
import Received from "./Received";
import Form from "./Form";

//Icons
import { MoneyRecive, MoneySend, MoneyAdd } from "iconsax-react";

const Index = () => {

    const { prices, fetchPrices } = useAdminStore();
    const [newTransaction, setNewTransaction] = useState<boolean>(false);
    const [page, setPage] = useState<string>("sent");

    useEffect(() => {
        if (!prices || prices === null) {
            fetchPrices();
        }
    }, [fetchPrices, prices])

    //Functions
    const togglePage = (page: string) => setPage(page);
    const toggleNew = () => setNewTransaction((prev) => !prev);

    return (
        <main>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-y-3 mt-4">
                <button onClick={toggleNew} className="bg-primary hover:bg-yellow-600 px-6 py-3 rounded-xl font-medium duration-300"><MoneyAdd size={20} className="inline-flex mr-1 mb-0.5" />Create Transaction</button>
                <div className="flex gap-x-5 text-[10px] text-neutral-100 md:text-sm xl:text-sm">
                    <button onClick={() => togglePage("sent")} className={`${page === "sent" ? "bg-accent" : "bg-neutral-600"} px-4 py-1 rounded-3xl duration-300`}><MoneySend className="inline-flex mr-1 mb-0.5" size={16} />Sent Transactions</button>
                    <button onClick={() => togglePage("received")} className={`${page === "received" ? "bg-accent" : "bg-neutral-600"} px-4 py-1 rounded-3xl duration-300`}><MoneyRecive className="inline-flex mr-1 mb-0.5" size={16} />Received Transactions</button>
                </div>
            </div>
            {prices !== null && page === "sent" ?
                <Sent prices={prices!} /> :
                <Received prices={prices!} />
            }
            {newTransaction && <Form toggleOpen={toggleNew} />}
        </main>
    );
}

export default Index;