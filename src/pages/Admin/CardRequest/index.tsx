//Hooks
import { GetCardRequests } from "@/services/queries.service";

const Index = () => {

    const { data } = GetCardRequests();
    console.log("The data", data)

    return (
        <main>

        </main>
    );
}

export default Index;