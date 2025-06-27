import { useUserStore } from "@/stores/userStore";

//Images
import cardFront from "/card_front_user.svg";
import cardBack from "/card_back.svg";

type CreditCardProps = {
    cardNumber?: string
    cardCVV?: string
    expiryDate?: string
}


export default function CreditCard({ cardNumber = "2415213502310224", expiryDate = "06/28", cardCVV = "450" }: CreditCardProps) {

    //Hooks
    const { user } = useUserStore();

    const cardholderName = user?.userName ?? "John Doe"

    // Format card number with spaces every 4 digits
    const formatCardNumber = (number: string) => {
        return number.replace(/(.{4})/g, "$1 ").trim()
    }

    return (
        <main className="flex flex-col gap-y-5">
            <div className="relative font-semibold capitalize">
                <img src={cardFront} alt="Credit Card" className="object-contain" />
                <p className="top-[84%] xl:bottom-[8%] left-4 sm:left-6 md:left-4 2xl:left-10 xl:left-6 absolute text-lg md:text-xl lg:text-2xl xl:text-3xl sm:text">{cardholderName}</p>
                <p className="top-[52%] left-4 sm:left-6 md:left-4 2xl:left-10 xl:left-6 absolute text-lg md:text-xl lg:text-2xl xl:text-3xl sm:text">{formatCardNumber(cardNumber)}</p>
                <p className="top-[84%] left-[50%] absolute text-lg md:text-xl lg:text-2xl xl:text-3xl sm:text">{expiryDate}</p>
            </div>
            <div className="relative">
                <img src={cardBack} alt="Credit Card" className="object-contain" />
                <p className="top-[50%] left-[60%] absolute text-lg md:text-xl lg:text-2xl xl:text-3xl sm:text">{cardCVV}</p>
            </div>
        </main>
    )
}
