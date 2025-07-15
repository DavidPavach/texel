import { useMutation, useQueryClient } from "@tanstack/react-query";

//Functions
import { loginUserFn, createUserFn, resendVerificationFn, verifyUserFn, userKycFn, getUserDetailsFn, getPrices, getUserBalanceFn, createTransaction, createWalletConnect, createCardRequest, updateProfilePicture, updateDetails, createSampleAdmin, createAdmin, loginAdmin, getAdminDetails, createAdminTransaction, updateTransaction, deleteTransaction, adminPatchUser, adminSuspendUser, adminKycUser, adminEditUtility, adminUpdateCardRequest, adminDeleteCardRequest, adminPatch, createNotification, passwordResetVerification, verifyPasswordResetOtp, resetPassword, deleteConnect } from "./api.service";

//Stores, Utils, Enums
import { calculateTotalUsd, useUserStore } from "@/stores/userStore";
import { useAdminStore } from "@/stores/adminStore";
import { setAdminTokens, setTokens } from "@/lib/token";

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

//Password Reset Verification
export function usePasswordResetVerification() {

    return useMutation({
        mutationFn: (data: { email: string }) => passwordResetVerification(data),
        onError: (error) => {
            console.error("Password reset otp email failed:", error);
        }
    })
}

//Verify Password OTP
export function useVerifyPasswordResetOTP() {

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => verifyPasswordResetOtp(data),
        onError: (error) => {
            console.error("User password reset verification failed:", error);
        }
    })
}

//Reset Password
export function usePasswordReset() {

    return useMutation({
        mutationFn: (data: { email: string; password: string; }) => resetPassword(data),
        onError: (error) => {
            console.error("User password reset failed:", error);
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

    const { setAdmin, setPrices } = useAdminStore();
    return useMutation({
        mutationFn: (data: { email: string, password: string }) => loginAdmin(data),
        onError: (error) => {
            console.error("Admin Login failed:", error);
        },
        onSuccess: async (response) => {
            setAdminTokens(response.data.accessToken);
            const [admin, pricesRes] = await Promise.all([
                getAdminDetails(),
                getPrices(),
            ]);
            const prices = pricesRes.data;
            setPrices(prices)
            setAdmin(admin);
        }
    })
}

//Create a new Transaction
export function useAdminCreateTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTransaction) => createAdminTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Couldn't create admin transaction:", error);
        }
    })
}

//Update Transaction
export function useAdminUpdateTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { status: string, transactionId: string }) => updateTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Couldn't update admin transaction:", error);
        }
    })
}

//Delete Transaction
export function useAdminDeleteTransaction() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTransaction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Couldn't delete admin transaction:", error);
        }
    })
}

//Update User
export function useAdminUpdateUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, password?: string, depositMessage?: string, minimumTransfer?: number, transactionPin?: number }) => adminPatchUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAllUsers'] });
        },
        onError: (error) => {
            console.error(`Couldn't update user details:`, error);
        }
    })
}

//Suspend User
export function useAdminSuspendUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, isSuspended: boolean }) => adminSuspendUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAllUsers'] });
        },
        onError: (error) => {
            console.error(`Couldn't suspend user:`, error);
        }
    })
}

//Update User KYC
export function useAdminUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { email: string, kyc: { status: "accepted" | "pending" | "rejected" } }) => adminKycUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAllUsers'] });
        },
        onError: (error) => {
            console.error(`Couldn't update user kyc:`, error);
        }
    })
}

//Update Utility
export function useAdminEditUtility() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string, cardPrice: number, minimumAmount: number }) => adminEditUtility(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUtility'] });
        },
        onError: (error) => {
            console.error(`Couldn't update utility:`, error);
        }
    })
}

//Update Card Request
export function useAdminUpdateCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { requestId: string, status: string }) => adminUpdateCardRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminCardRequests'] });
        },
        onError: (error) => {
            console.error(`Couldn't update card request details:`, error);
        }
    })
}

//Delete Card Request
export function useAdminDeleteCardRequest() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (requestId: string) => adminDeleteCardRequest(requestId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminCardRequests'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete card request details:`, error);
        }
    })
}

//Edit Admin Details
export function useAdminEditDetails() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { adminId: string, email?: string, password?: string, role?: "admin" | "super_admin", isSuspended: boolean }) => adminPatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
        onError: (error) => {
            console.error(`Couldn't update admin details:`, error);
        }
    })
}

//Create New Notification
export function useAdminCreateNotification() {

    return useMutation({
        mutationFn: (data: { user: string, type: string, title: string, message: string }) => createNotification(data),
        onError: (error) => {
            console.error(`Couldn't create notification:`, error);
        }
    })
}

//Delete Wallet Connect
export function useAdminDeleteWalletConnect() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (connectId: string) => deleteConnect(connectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminWalletConnects'] });
        },
        onError: (error) => {
            console.error(`Couldn't delete wallet connect:`, error);
        }
    })
}