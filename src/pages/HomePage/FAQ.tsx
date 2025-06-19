import { useState } from "react";

//Data
import faqData from "../../../data/faqs.json";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {

    const [openItems, setOpenItems] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState("All")

    const categories = ["All", ...Array.from(new Set(faqData.map((item) => item.category)))]

    //Functions
    const filteredFAQs = faqData.filter((item) => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
        return matchesCategory
    })

    const toggleItem = (id: string) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    return (
        <section className="space-y-8">
            <div className="space-y-6 text-center">
                <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 text-primary">
                    <HelpCircle className="mr-2 size-4" />
                    Support Center
                </Badge>

                <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">
                    Frequently Asked
                    <span className="block text-primary">Questions</span>
                </h2>

                <p className="mx-auto max-w-[60ch] text-sm md:text-base xl:text-lg">
                    Find answers to common questions about our TexelChain. Can't find what you're looking for? Contact our
                    support team.
                </p>
            </div>

            <div className="flex md:justify-center gap-2 pb-2 overflow-x-auto">
                {categories.map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                            ? "bg-primary text-black"
                            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                            }`}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="space-y-4 mx-auto">
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((item) => (
                        <Card key={item.id} className="shadow-sm hover:shadow-md border-neutral-200 transition-shadow">
                            <CardContent className="p-0">
                                <button onClick={() => toggleItem(item.id)} className="flex justify-between items-center hover:bg-neutral-50 p-4 rounded-xl w-full text-left transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Badge className="bg-primary/20 hover:bg-primary/20 text-primary text-xs">{item.category}</Badge>
                                        </div>
                                        <h3 className="pr-4 font-semibold text-lightBlack text-sm md:text-base xl:text-lg grotesk">{item.question}</h3>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {openItems.includes(item.id) ? (
                                            <ChevronUp className="size-5 text-neutral-500" />
                                        ) : (
                                            <ChevronDown className="size-5 text-neutral-500" />
                                        )}
                                    </div>
                                </button>

                                {openItems.includes(item.id) && (
                                    <div className="px-4 pb-4">
                                        <div className="pt-4 border-neutral-200 border-t">
                                            <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="shadow-sm border-neutral-200">
                        <CardContent className="p-12 text-center">
                            <HelpCircle className="mx-auto mb-4 w-12 h-12 text-neutral-400" />
                            <h3 className="mb-2 font-medium text-neutral-600 text-sm md:text-base xl:text-lg">No questions found</h3>
                            <p className="text-neutral-500">Try adjusting your search terms or category filter.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    )
}
