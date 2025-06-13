import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const login = async () => {
            try {
                const res = await fetch("https://dummyjson.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: "emilys",
                        password: "emilyspass",
                        expiresInMins: 30, // optional
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Login failed");

                setUser({
                    name: data.firstName + " " + data.lastName,
                    email: data.email,
                    phone: data.phone || "+91-9876543210", // fallback if not provided
                    address: "Dummy User, Internet", // Dummy address
                    joined: "June 2025",
                    profileImage: data.image || "https://via.placeholder.com/150",
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        login();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl font-semibold text-purple-600">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl font-semibold text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 flex items-center justify-center px-4 py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border-4 border-pink-300 hover:shadow-pink-400 hover:shadow-2xl transition-shadow duration-300 p-10"
            >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg"
                    />
                    <div className="text-center sm:text-left">
                        <h2 className="text-4xl font-extrabold text-purple-700">{user.name}</h2>
                        <p className="text-lg text-gray-600 mt-1 font-medium">Joined in {user.joined}</p>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <p className="text-xl text-gray-700 font-bold">📧 Email</p>
                        <p className="text-lg text-black font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-xl text-gray-700 font-bold">📱 Phone</p>
                        <p className="text-lg text-black font-semibold">{user.phone}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-xl text-gray-700 font-bold">📍 Address</p>
                        <p className="text-lg text-black font-semibold">{user.address}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;