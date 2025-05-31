import { useQuery } from "@tanstack/react-query";

//Api endpoints
import { getAllTransactions, getCardRequest, getCoinPrice, getCoinTransactions, getPrices, getUserBalanceFn, getUserDetailsFn, getUserLastTransactionsFn, getWalletConnectStats } from "./api.service";

//Get Current logged In User Details
export function GetUserDetails() {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: () => getUserDetailsFn()
    })
}

//Get Current Logged In User Balance
export function GetUserBalance() {
    return useQuery({
        queryKey: ['userBalance'],
        queryFn: () => getUserBalanceFn()
    })
}

//Get Prices
export function GetPrices() {
    return useQuery({
        queryKey: ['prices'],
        queryFn: () => getPrices()
    })
}

//Get Current User Last Three Transactions
export function GetUserLastThreeTransactions() {
    return useQuery({
        queryKey: ['lastThree'],
        queryFn: () => getUserLastTransactionsFn()
    })
}

//Get Current User Transactions
export function GetAllTransactions(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['allTransactions'],
        queryFn: () => getAllTransactions(page, limit)
    })
}

//Get a Coin Price
export function GetCoinPrice(coin: string) {
    return useQuery({
        queryKey: ['coinPrice'],
        queryFn: () => getCoinPrice(coin)
    })
}

//Get a Coin Transactions
export function GetCoinTransactions(data: { coin: string }) {
    return useQuery({
        queryKey: ['coinTransactions'],
        queryFn: () => getCoinTransactions(data)
    })
}

//Get user wallet connect Stats
export function GetWalletConnectStats() {
    return useQuery({
        queryKey: ['walletStats'],
        queryFn: () => getWalletConnectStats()
    })
}

//Get a user card request
export function GetCardRequest() {
    return useQuery({
        queryKey: ['cardRequest'],
        queryFn: () => getCardRequest()
    })
}