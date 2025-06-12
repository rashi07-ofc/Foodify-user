// import React from "react";

// const ProfilePage = () => {
//     const user = {
//         name: "Vaishnavi Singh",
//         email: "vaishnavi@example.com",
//         phone: "+91-9876543210",
//         address: "Ballia, Uttar Pradesh, India",
//         joined: "January 2024",
//         profileImage: "https://via.placeholder.com/150", // Replace with actual
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-6">
//             <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
//                 <div className="flex items-center gap-6">
//                     <img
//                         src={user.profileImage}
//                         alt="Profile"
//                         className="w-24 h-24 rounded-full object-cover"
//                     />
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//                         <p className="text-sm text-gray-500">Joined: {user.joined}</p>
//                     </div>
//                 </div>

//                 <div className="mt-6 space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <p className="text-gray-600">Email</p>
//                             <p className="text-gray-900 font-medium">{user.email}</p>
//                         </div>
//                         <div>
//                             <p className="text-gray-600">Phone</p>
//                             <p className="text-gray-900 font-medium">{user.phone}</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p className="text-gray-600">Address</p>
//                         <p className="text-gray-900 font-medium">{user.address}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;


import React from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const user = {
        name: "Vaishnavi Singh",
        email: "vaishnavi@example.com",
        phone: "+91-9876543210",
        address: "Ballia, Uttar Pradesh, India",
        joined: "January 2024",
        profileImage: "data:image/png;base64,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",
    };

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
                        //alt="Profile"
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

//Api use krenge isme:--
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const ProfilePage = () => {
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 //const res = await axios.get("https://your-api.com/api/profile"); // replace with actual endpoint
//                // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`);
//                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, { withCredentials: true });

//                 setUser(res.data);
//             } catch (error) {
//                 console.error("Failed to fetch profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 text-xl font-semibold">
//                 Loading profile...
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-lg">
//                 Failed to load profile data.
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100 flex items-center justify-center px-4 py-10">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border-4 border-pink-300 hover:shadow-pink-400 hover:shadow-2xl transition-shadow duration-300 p-10"
//             >
//                 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
//                     <motion.img
//                         whileHover={{ scale: 1.05 }}
//                         src={user.profileImage || "/default-profile.png"}
//                         alt="Profile"
//                         className="w-36 h-36 rounded-full object-cover border-4 border-purple-500 shadow-lg"
//                     />
//                     <div className="text-center sm:text-left">
//                         <h2 className="text-5xl font-extrabold text-purple-700 drop-shadow-sm">{user.name}</h2>
//                         <motion.p
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-lg text-gray-600 mt-1 font-semibold"
//                         >
//                             🎉 Joined in {user.joined}
//                         </motion.p>
//                     </div>
//                 </div>

//                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
//                     <motion.div
//                         initial={{ x: -30, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <p className="text-xl text-gray-700 font-bold">📧 Email</p>
//                         <p className="text-lg text-black font-semibold">{user.email}</p>
//                     </motion.div>
//                     <motion.div
//                         initial={{ x: 30, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <p className="text-xl text-gray-700 font-bold">📱 Phone</p>
//                         <p className="text-lg text-black font-semibold">{user.phone}</p>
//                     </motion.div>
//                     <motion.div
//                         initial={{ y: 30, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                         className="sm:col-span-2"
//                     >
//                         <p className="text-xl text-gray-700 font-bold">📍 Address</p>
//                         <p className="text-lg text-black font-semibold">{user.address}</p>
//                     </motion.div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default ProfilePage;
