import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

export default function useUser() {
    const { isLoggedIn, setUser } = useAuth();
    const axiosPrivateInstance = useAxiosPrivate();

    const getUser = async () => {
        if (!isLoggedIn) {
            return;
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/user');
            setUser(data);
        } catch (error) {
            console.log("Error fetching user data:", error.response);
        }
    };

    return getUser; // Ensure you return the getUser function
}
