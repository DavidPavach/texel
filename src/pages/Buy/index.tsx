//Components
import FeaturedExchange from "../Buy/FeaturedExchange";
import ExchangeCard from "./ExchangeCard";

//Images
import moonpay from "/moon-pay.png";
import binance from "/binance.jpg";
import coinbase from '/coinbase.jpg';
import kraken from '/kraken.png';
import gemini from "/gemini.jpg";

const index = () => {
    return (
        <main>
            <FeaturedExchange name="MoonPay" logo={moonpay}
                description="MoonPay offers a fast and secure way to buy cryptocurrency with credit card, debit card, or bank transfer. With support for over 30 cryptocurrencies and 160+ countries, MoonPay makes it easy to enter the world of digital assets."
                videoId="0k3yV9ekPG0?si=pSKdraoVWh71oein"
                url="https://www.moonpay.com"
                features={["Credit/Debit Card Support", "Bank Transfer Available", "30+ Cryptocurrencies", "160+ Countries Supported", "Industry-Leading Security", "24/7 Customer Support"]}
            />

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-4">
                <ExchangeCard name="Binance" logo={binance}
                    description="Binance is the world's largest cryptocurrency exchange by trading volume, offering a platform for trading over 350 cryptocurrencies."
                    videoId="1c87W5D1_9s?si=h_8SM227rrvAwT1q"
                    features={["Low fees", "High liquidity", "Advanced trading tools"]}
                    paymentMethods={["Credit/Debit Card", "Bank Transfer", "P2P Trading"]}
                    processingTime="Instant to 1-3 business days"
                    securityLevel="high"
                    url="https://www.binance.com"
                />
                <ExchangeCard name="Coinbase" logo={coinbase}
                    description="Coinbase is a secure platform that makes it easy to buy, sell, and store cryptocurrency like Bitcoin, Ethereum, and more."
                    videoId="RK2qbvbuu48?si=fGi5m-BA1Ixr_QFO"
                    features={["User-friendly interface", "Insured holdings", "Educational resources"]}
                    paymentMethods={["Credit/Debit Card", "Bank Transfer", "PayPal"]}
                    processingTime="Instant to 5 business days"
                    securityLevel="high"
                    url="https://www.coinbase.com"
                />
                <ExchangeCard
                    name="Kraken"
                    logo={kraken}
                    description="Kraken is a cryptocurrency exchange and bank founded in 2011, offering spot trading, margin trading, and futures trading."
                    videoId="SHIx4kZTgK0" 
                    features={["Advanced trading features", "Strong security", "Margin trading"]}
                    paymentMethods={["Bank Transfer", "SWIFT", "FedWire"]}
                    processingTime="1-5 business days"
                    securityLevel="high"
                    url="https://www.kraken.com"
                />
                <ExchangeCard name="Gemini" logo={gemini}
                    description="Gemini is a regulated cryptocurrency exchange, wallet, and custodian that makes it simple and secure to buy bitcoin, ethereum, and other cryptocurrencies."
                    videoId="f29THE0aXKc"
                    features={["Regulated platform", "Insurance coverage", "Earn interest"]}
                    paymentMethods={["Credit/Debit Card", "Bank Transfer", "Wire Transfer"]}
                    processingTime="Instant to 4-5 business days"
                    securityLevel="high"
                    url="https://www.gemini.com"
                />
            </div>
        </main>
    );
}

export default index;