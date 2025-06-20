//Components
import { ReusableHero } from "@/components/ReusableHero";

//Icons
import { ClipboardText } from "iconsax-react";

const Index = () => {
    return (
        <main className="space-y-8 mx-auto px-4 sm:px-6 md:px-8 xl:px-20 py-10 max-w-4xl text-neutral-200">
            <ReusableHero
                badge={{ text: "For Enterprises", icon: <ClipboardText className="size-4" /> }}
                title="Policies, Terms and Conditions"
                description="Your Guide to Secure and Seamless Service"
                variant="centered"
                size="xl"
                breadcrumbs={[{ label: "Policies" }]}
            />

            <article className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                    TexelChain is an online website and platform that allows users to securely buy/sell digital assets. Our mission is to be the safest, easiest and most transparent digital asset platform in existence. These Terms of Service (the "Terms"), the Privacy and Transparency Statement and any and all other agreements between TexelChain and its users will use the following definitions:
                </p>
                <ul className="list-disc list-inside">
                    <li><strong>"Customer," "user," "you," and "your"</strong> refers to the person or entity accessing and/or using TexelChain.</li>
                    <li><strong>"Company," "our," "TexelChain," "Website," "we," and "us"</strong> collectively refer to the online website and platform "TexelChain" and its owners, directors, officers, employees, operators, agents, insurers, suppliers, and attorneys.</li>
                    <li><strong>"Party"</strong> may refer to either you or us, and <strong>"Parties"</strong> refers to both you and us. The contracting parties are you and TexelChain.</li>
                    <li><strong>"Asset," "digital asset," "coin," "cryptocurrency," "funds," "good," "ledger entry," and "token"</strong> refer to blockchain-based software ledger data entries.</li>
                </ul>

                <h2 className="font-semibold text-lg">1. Acceptance of Terms</h2>
                <p>
                    By accessing the website, you agree to be bound by our Terms and all applicable laws. If you do not agree, stop using the Website. Continued use means deemed acceptance of any amendments.
                </p>

                <h3 className="font-medium">1.1. Modification</h3>
                <p>
                    TexelChain may revise our Terms at any time. Use of the site after revisions constitutes acceptance. Users should check back regularly for updates.
                </p>

                <h2 className="font-semibold text-lg">2. Eligibility</h2>
                <ul className="space-y-1 ml-4 list-decimal list-inside">
                    <li>At least 18 years old and legally capable.</li>
                    <li>Using legally obtained funds.</li>
                    <li>Not engaging in unlawful activities.</li>
                    <li>Compliant with applicable laws.</li>
                </ul>
                <p>TexelChain reserves the right to terminate access at its sole discretion.</p>

                <h2 className="font-semibold text-lg">3. Restrictions on Use</h2>
                <h3 className="font-medium">3.1. Prohibited Jurisdictions</h3>
                <p>Accessing TexelChain from prohibited regions may result in some penalties. TexelChain may seize such funds and donate them to charity.</p>

                <h3 className="font-medium">3.2. Source of Funds</h3>
                <p>No funds from criminal or fraudulent sources are allowed. TexelChain reserves the right to deny transactions perceived as risky.</p>

                <h3 className="font-medium">3.3. Abuse of Platform</h3>
                <p>Abusive usage that imposes an unreasonable load is prohibited.</p>

                <h3 className="font-medium">3.4. Counterparties</h3>
                <p>All transactions must be between you and TexelChain. Third-party transactions are not permitted.</p>

                <h2 className="font-semibold text-lg">4. Prices, Exchange Rates, and Confirmations</h2>
                <p>
                    Cryptocurrency prices are volatile. Normal orders calculate the rate at payment acceptance (typically one block confirmation). "Precise Amount" orders guarantee a rate for a fixed time. Only one deposit per TXID is accepted. Confirmations must occur within 48 hours.
                </p>

                <h2 className="font-semibold text-lg">5. Third-Party Phishing Scams</h2>
                <p>
                    Only use the official TexelChain domain. TexelChain is not responsible for losses from phishing scams. Verify all communication and report scams to the Help Center.
                </p>

                <h2 className="font-semibold text-lg">6. Costs</h2>
                <p>
                    We reserve the right to recover reasonable administrative costs for support issues not caused by our negligence.
                </p>

                <h2 className="font-semibold text-lg">7. Payment and Fees</h2>
                <p>
                    Fees applicable to the Services or any component of the Services, if any, shall be set forth at and/or the mobile application.
                </p>

                <h2 className="font-semibold text-lg">8. Transaction Fees</h2>
                <p>
                    There may be transaction fees (e.g. swapping fees) associated with your virtual currency transactions that are required by the virtual currency system or blockchain network that you engage with. You must ensure that you have an adequate balance in your wallet and/or “gas” to complete transactions before initiating a transaction. You acknowledge and agree that we will not be liable for any failed transactions or losses you incur due to incorrectly set transaction fees (i.e. too low or too high) or due to insufficient funds or gas associated with your wallet address. You further acknowledge and agree that we do not have access to your or anyone else’s transactions.
                </p>
                <p><span className="font-semibold text-primary">Note: </span>To be able to withdraw, you must have your Master card activated.</p>

                <h2 className="font-semibold text-lg">9. Taxes</h2>
                <p>
                    It is your responsibility to determine what, if any, taxes apply to the transactions that you have submitted transaction details for via the Services, and it is your responsibilities.
                </p>

                <h2 className="font-semibold text-lg">10. Investment Advice</h2>
                <p>
                    TexelChain does not offer investment advice. All decisions are made solely by you. Assets are not securities and no profit should be expected.
                </p>

                <h2 className="font-semibold text-lg">11. Privacy and Transparency Statement</h2>
                <p>
                    TexelChain minimizes data collection and complies with legal requests. Blockchain transparency means transactions are public. We reserve the right to share data with legal authorities.
                </p>

                <h2 className="font-semibold text-lg">12. Investigations</h2>
                <p>
                    You agree to cooperate fully with TexelChain investigations, including providing documents and responses in a timely manner.
                </p>

                <h2 className="font-semibold text-lg">13. Limitations</h2>
                <p>
                    TexelChain is not liable for any losses, damages, or expenses, including indirect or consequential damages. Total liability is capped at 50 EUR.
                </p>

                <h2 className="font-semibold text-lg">14. Contact Us</h2>
                <p>
                    Support is available via the Help Center. Please include identifying information and relevant TXIDs.
                </p>

                <h2 className="font-semibold text-lg">15. Copyright</h2>
                <p>
                    Website materials are protected by copyright and trademark laws.
                </p>

                <h2 className="font-semibold text-lg">16. Severability</h2>
                <p>
                    If any provision is invalid, it will be excluded, and remaining provisions remain in effect. Invalid terms will be replaced with enforceable equivalents.
                </p>

                <h2 className="font-semibold text-lg">17. Entire Agreement</h2>
                <p>
                    These Terms represent the complete agreement between you and TexelChain regarding the subject matter.
                </p>
            </article>
        </main>
    );
};

export default Index;