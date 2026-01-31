import html2canvas from "html2canvas";

// Utils and Enums
import { formatDate } from "@/utils/format";
import { getWallet } from "@/enums";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserInfo from "@/components/user-info";

// Icons
import { Check, X, Clock, Download } from "lucide-react";


export default function TransactionDetails({ transaction, onClose }: { transaction: Transaction; onClose: () => void }) {

  const formatAddress = (address: string) => {
    if (address.length < 10) return address;
    return `${address.substring(0, 4)}****${address.substring(
      address.length - 4
    )}`;
  };

  const statusConfig = {
    successful: {
      label: "Success",
      subtitle: "Transaction Completed",
      ring: "border-green-500",
      fill: "bg-green-500",
      icon: <Check className="size-4" />,
    },
    pending: {
      label: "Pending",
      subtitle: "Transaction Processing",
      ring: "border-yellow-400",
      fill: "bg-yellow-400",
      icon: <Clock className="size-4" />,
    },
    failed: {
      label: "Failed",
      subtitle: "Transaction Failed",
      ring: "border-red-500",
      fill: "bg-red-500",
      icon: <X className="size-4" />,
    },
  }[transaction.status];

  const receiptStatusConfig = {
    successful: {
      label: "Success",
      subtitle: "Transaction Completed",
      containerGradient:
        "bg-gradient-to-br from-green-400/20 via-white to-emerald-500/20",
      iconGradient:
        "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
      iconInner:
        "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur",
      textColor: "text-green-600",
      icon: <Check className="size-6 text-white" />,
    },
    pending: {
      label: "Pending",
      subtitle: "Transaction Processing",
      containerGradient:
        "bg-gradient-to-br from-yellow-400/20 via-white to-orange-500/20",
      iconGradient:
        "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
      iconInner:
        "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur",
      textColor: "text-yellow-600",
      icon: <Clock className="size-6 text-white" />,
    },
    failed: {
      label: "Failed",
      subtitle: "Transaction Failed",
      containerGradient:
        "bg-gradient-to-br from-red-400/20 via-white to-rose-500/20",
      iconGradient:
        "bg-gradient-to-br from-red-400 via-red-500 to-rose-600",
      iconInner:
        "bg-gradient-to-br from-white/30 to-white/10 backdrop-blur",
      textColor: "text-red-600",
      icon: <X className="size-6 text-white" />,
    },
  }[transaction.status];


  const downloadReceipt = async () => {
    const node = document.getElementById("receipt-render");
    if (!node) return;

    const canvas = await html2canvas(node, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `transaction-${transaction.user.accountId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* MAIN VIEW */}
      <Card className="border-neutral-200">
        <CardHeader className="bg-neutral-100/50 border-b">
          <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
            <CardTitle className="text-lightBlack text-base md:text-lg xl:text-xl capitalize">
              {transaction.transactionType} Transaction
            </CardTitle>

            <div className="flex items-center gap-3">
              <Badge className={`px-3 py-1 font-medium flex items-center gap-1.5 ${transaction.status === "successful" ? "bg-green-100 text-green-700" : transaction.status === "failed" ? "bg-red-100 text-red-700" : "bg-primary/20 text-primary"}`}>
                {statusConfig.icon}
                {statusConfig.label}
              </Badge>

              <button onClick={downloadReceipt} className="inline-flex items-center gap-2 hover:bg-neutral-100 px-3 py-1 border rounded-md text-sm">
                <Download className="size-4" />
                Receipt
              </button>

              <Badge variant="destructive" className="cursor-pointer" onClick={onClose}>
                Close
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <Info label="Transaction ID" value={transaction._id} />
            <Info label="Date" value={formatDate(new Date(transaction.createdAt))} />
            <Info label="Amount" value={`${transaction.amount.toLocaleString()} ${transaction.coin.toUpperCase()}`} highlight />
            <Info label="Network" value={transaction.network.toUpperCase()} />
            <Info label="Transaction Hash" value={transaction.transactionHash} full />
            <Info label="Wallet Address" value={transaction.walletAddress} full />
          </div>
        </CardContent>
      </Card>

      <UserInfo user={transaction.user} />

      {/* HIDDEN RECEIPT (IMAGE SOURCE) */}
      <div className="top-0 left-[-9999px] fixed">
        <div id="receipt-render" className="bg-white px-6 py-8 border rounded-2xl w-[420px]">

          {/* STATUS */}
          <div className="flex flex-col items-center text-center">
            {/* Gradient Icon */}
            <div className={`flex items-center justify-center size-16 rounded-full ${receiptStatusConfig.iconGradient}`}>
              <div className={`flex items-center justify-center size-12 rounded-full ${receiptStatusConfig.iconInner}`}>
                {receiptStatusConfig.icon}
              </div>
            </div>

            {/* Text */}
            <h3 className={`mt-4 font-semibold text-lg ${receiptStatusConfig.textColor}`}>
              {receiptStatusConfig.label}
            </h3>
            <p className="text-neutral-500 text-sm">
              {receiptStatusConfig.subtitle}
            </p>
          </div>

          <hr className="my-6" />

          {/* DETAILS */}
          <ReceiptRow label="Quantity">
            {transaction.amount.toLocaleString()} {transaction.coin.toUpperCase()}
          </ReceiptRow>

          <ReceiptRow label="Token">
            {transaction.coin.toUpperCase()} (
            {transaction.network.toUpperCase()})
          </ReceiptRow>

          <ReceiptRow label="Send to">
            {formatAddress(getWallet[transaction.coin].walletAddress)}
          </ReceiptRow>

          <ReceiptRow label="Account ID">
            <span className="font-medium text-blue-600">
              {transaction.user.accountId}
            </span>
          </ReceiptRow>

          <ReceiptRow label="Transaction ID">
            {formatAddress(transaction.transactionHash)}
          </ReceiptRow>

          <ReceiptRow label="Date">
            {formatDate(new Date(transaction.createdAt))}
          </ReceiptRow>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, full, highlight }: { label: string; value: string; full?: boolean; highlight?: boolean }) {
  return (
    <div className={full ? "md:col-span-2 space-y-1" : "space-y-1"}>
      <p className="text-[11px] text-neutral-500 md:text-xs xl:text-sm">{label}</p>
      <p className={`break-all ${highlight ? "text-base md:text-lg xl:text-xl font-bold text-blue-600" : "font-medium"}`}>
        {value}
      </p>
    </div>
  );
}

function ReceiptRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-neutral-500">{label}:</span>
      <span className="font-medium text-right">{children}</span>
    </div>
  );
}
