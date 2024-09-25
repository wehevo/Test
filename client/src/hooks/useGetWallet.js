import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

export default function useGetWallet() {
    const { isLoggedIn, setUser } = useAuth();
    const axiosPrivateInstance = useAxiosPrivate();

    const getWalletBalance = async () => {
        if (!isLoggedIn) {
            return;
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/wallet-balance');
            return data.balance; // Return the balance to be used in the component
        } catch (error) {
            console.log("Error fetching wallet balance:", error.response);
            return null; // Return null in case of error
        }
    };

    return getWalletBalance; // Ensure you return the getUser function
}
