import { keepPreviousData, useQuery } from "@tanstack/react-query";

//Api endpoints
import { adminFetchUserBalance, adminFetchUserTransactions, getAdminDetails, getAdmins, getAllTransactions, getAllUsers, getCardRequest, getCardRequests, getCoinPrice, getCoinTransactions, getPrices, getTransactions, getUser, getUserBalanceFn, getUserDetailsFn, getUserLastTransactionsFn, getWalletConnects, getWalletConnectStats } from "./api.service";

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

//Admin Endpoints
//Get current logged in admin
export function GetAdminDetails() {
    return useQuery({
        queryKey: ['adminDetails'],
        queryFn: () => getAdminDetails()
    })
}

//Fetch Transactions
export function GetTransactions(type?: string, page?: string, limit?: string) {
    return useQuery({
        queryKey: ['adminTransactions', type, page, limit],
        queryFn: () => getTransactions(type, page, limit)
    })
}

//Fetch Card Requests
export function GetCardRequests(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['adminCardRequests'],
        queryFn: () => getCardRequests(page, limit)
    })
}

//Fetch Wallet Connects
export function GetWalletConnects(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['adminWalletConnects'],
        queryFn: () => getWalletConnects(page, limit)
    })
}

//Fetch Admins
export function GetAdmins() {
    return useQuery({
        queryKey: ['admins'],
        queryFn: () => getAdmins()
    })
}

//Fetch a user
export function useSearchUser(value: string) {
    return useQuery({
        queryKey: ['searchUser'],
        queryFn: () => getUser(value),
        enabled: value.trim().length > 5,
    })
}

//Fetch all Users
export function GetAllUsers(page?: string, limit?: string) {
    return useQuery({
        queryKey: ['adminAllUsers'],
        queryFn: () => getAllUsers(page, limit)
    })
}

//Fetch a user Transactions
export function useGetUserTransactions(data: { page?: string, limit?: string, userId: string, transactionType?: string }) {
    return useQuery({
        queryKey: ['user-transactions', data.userId, data.page, data.limit, data.transactionType],
        queryFn: () => adminFetchUserTransactions(data),
        placeholderData: keepPreviousData,
    });
}


//Fetch a user Balance
export function useGetUserBalance (userId: string) {
    return useQuery({
        queryKey: [`${userId} balance`],
        queryFn: () => adminFetchUserBalance(userId)
    })
}