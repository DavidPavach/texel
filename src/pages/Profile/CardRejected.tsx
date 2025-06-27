import { useState } from "react";

//Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

//Icons
import { Eye, EyeOff, XCircle } from "lucide-react";

type CardRejectionStatusProps = {
    cardNumber?: string
    expiryDate?: string
}

export default function CardRejected({ cardNumber = "2415213502310224", expiryDate = "06/28" }: CardRejectionStatusProps) {

    const [showCardDetails, setShowCardDetails] = useState(false)

    const formatCardNumber = (number: string) => {
        if (!showCardDetails) {
            return `****-****-****-${number.slice(-4)}`
        }
        return number.replace(/(.{4})/g, "$1-").slice(0, -1)
    }

    const formatExpiryDate = (date: string) => {
        return showCardDetails ? date : "**/**"
    }

    return (
        <div className="flex justify-center items-center">
            <div className="space-y-6 w-full">
                <Card className="border-red-200">
                    <CardHeader className="pb-4 text-center">
                        <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16">
                            <XCircle className="size-8 text-red-600" />
                        </div>
                        <CardTitle className="text-red-700 text-xl">Card Request Rejected</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert className="bg-red-50 border-red-200">
                            <AlertDescription className="text-red-800">
                                Your card application has been declined.
                            </AlertDescription>
                        </Alert>
                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium text-gray-900">Card Information</h3>
                                <Button variant="ghost" size="sm" onClick={() => setShowCardDetails(!showCardDetails)} className="text-blue-600 hover:text-blue-700">
                                    {showCardDetails ? (
                                        <><EyeOff className="mr-1 size-4" /> Hide</>
                                    ) : (
                                        <><Eye className="mr-1 size-4" /> Show Details</>
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Card Number:</span>
                                    <span className="font-mono text-gray-900">{formatCardNumber(cardNumber)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Expiry Date:</span>
                                    <span className="font-mono text-gray-900">{formatExpiryDate(expiryDate)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-gray-500 text-xs text-center">
                    This decision was made in accordance with our terms and conditions. You may reapply by contacting the support to ascertain the
                    rejection reason.
                </p>
            </div>
        </div>
    )
}
