import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import useGetWallet from '../hooks/useGetWallet'; // Import the new hook

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser();
    const getWalletBalance = useGetWallet(); // Call the useGetWallet hook
    const [balance, setBalance] = useState(null);
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [hasFetched, setHasFetched] = useState(false); // Flag to prevent multiple requests

    useEffect(() => {
        const fetchUser = async () => {
            if (!user) {
                await getUser(); // Fetch user only if not logged in
            }
        };

        fetchUser();
    }, [user, getUser]);

    useEffect(() => {
        const fetchBalance = async () => {
            if (user?.wallet_address && !hasFetched) { // Ensure the balance is fetched only once
                setLoadingBalance(true);
                const balance = await getWalletBalance(); // Use the new hook to get the balance
                setBalance(balance);
                setLoadingBalance(false);
                setHasFetched(true); // Set flag to true after fetching
            }
        };

        fetchBalance();
    }, [user, getWalletBalance, hasFetched]); // Add getWalletBalance to dependencies

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? (
                            <>
                                <p>Welcome, {user.email}!</p>
                                {loadingBalance ? (
                                    <p>Loading your balance...</p>
                                ) : (
                                    balance !== null ? (
                                        <p>Your Ethereum balance: {balance} ETH</p>
                                    ) : (
                                        <p>Unable to fetch balance.</p>
                                    )
                                )}
                            </>
                        ) : (
                            <p>Please login first</p>
                        )}
                    </div>
                </div>
            </h2>
        </div>
    );
}
