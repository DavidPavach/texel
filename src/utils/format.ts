//Format Date and Time
export const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

//Format currency
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value)
}

//Format Currency
export const formatCryptoAmount = (value: number) => {
    if (value < 0.01) return value.toFixed(4);
    if (value < 1) return value.toFixed(3);
    if (value < 1000) return value.toFixed(2);
    return value.toFixed(2);
};

//Format Coin Percentage
export const formatPercentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;