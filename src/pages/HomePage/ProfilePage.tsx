


// import React from "react";
// import { motion } from "framer-motion";

// const ProfilePage = () => {
//     const user = {
//         name: "Vaishnavi Singh",
//         email: "vaishnavi@example.com",
//         phone: "+91-9876543210",
//         address: "Ballia, Uttar Pradesh, India",
//         joined: "January 2024",
//         profileImage: "data:image/png;base64,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",
//     };

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
//                         src={user.profileImage}
//                         //alt="Profile"
//                         className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg"
//                     />
//                     <div className="text-center sm:text-left">
//                         <h2 className="text-4xl font-extrabold text-purple-700">{user.name}</h2>
//                         <p className="text-lg text-gray-600 mt-1 font-medium">Joined in {user.joined}</p>
//                     </div>
//                 </div>

//                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
//                     <div>
//                         <p className="text-xl text-gray-700 font-bold">📧 Email</p>
//                         <p className="text-lg text-black font-semibold">{user.email}</p>
//                     </div>
//                     <div>
//                         <p className="text-xl text-gray-700 font-bold">📱 Phone</p>
//                         <p className="text-lg text-black font-semibold">{user.phone}</p>
//                     </div>
//                     <div className="sm:col-span-2">
//                         <p className="text-xl text-gray-700 font-bold">📍 Address</p>
//                         <p className="text-lg text-black font-semibold">{user.address}</p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default ProfilePage;

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
                
                
//                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
                  
                
                  

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











//Mock API:--


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const ProfilePage = () => {
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const login = async () => {
//             try {
//                 const res = await fetch("https://dummyjson.com/auth/login", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         username: "emilys",
//                         password: "emilyspass",
//                         expiresInMins: 30, // optional
//                     }),
//                 });

//                 const data = await res.json();
//                 if (!res.ok) throw new Error(data.message || "Login failed");

//                 setUser({
//                     name: data.firstName + " " + data.lastName,
//                     email: data.email,
//                     phone: data.phone || "+91-9876543210", // fallback if not provided
//                     address: "Dummy User, Internet", // Dummy address
//                     joined: "June 2025",
//                     profileImage: data.image || "https://via.placeholder.com/150",
//                 });
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         login();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-2xl font-semibold text-purple-600">Loading profile...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <p className="text-2xl font-semibold text-red-500">Error: {error}</p>
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
//                         src={user.profileImage}
//                         alt="Profile"
//                         className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg"
//                     />
//                     <div className="text-center sm:text-left">
//                         <h2 className="text-4xl font-extrabold text-purple-700">{user.name}</h2>
//                         <p className="text-lg text-gray-600 mt-1 font-medium">Joined in {user.joined}</p>
//                     </div>
//                 </div>

//                 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
//                     <div>
//                         <p className="text-xl text-gray-700 font-bold">📧 Email</p>
//                         <p className="text-lg text-black font-semibold">{user.email}</p>
//                     </div>
//                     <div>
//                         <p className="text-xl text-gray-700 font-bold">📱 Phone</p>
//                         <p className="text-lg text-black font-semibold">{user.phone}</p>
//                     </div>
//                     <div className="sm:col-span-2">
//                         <p className="text-xl text-gray-700 font-bold">📍 Address</p>
//                         <p className="text-lg text-black font-semibold">{user.address}</p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default ProfilePage;





// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// interface UserProfile {
//     name: string;
//     email: string;
//     phone: string;
//     membershipTier: string;
//     totalOrders: number;
//     totalSpent: number;
//     loyaltyPoints: number;
//     favoriteRestaurants: string[];
//     dietaryPreferences: string[];
//     allergies: string[];
//     deliveryAddresses: Array<{
//         label: string;
//         address: string;
//         isDefault: boolean;
//     }>;
//     recentOrders: Array<{
//         restaurant: string;
//         items: string;
//         amount: number;
//         date: string;
//         rating: number;
//     }>;
// }

// const FoodDeliveryProfile: React.FC = () => {
//     const [user, setUser] = useState<UserProfile | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'preferences'>('profile');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             setUser({
//                 name: "Sarah Martinez",
//                 email: "sarah.martinez@email.com",
//                 phone: "+1 (555) 987-6543",
//                 membershipTier: "Gold Member",
//                 totalOrders: 127,
//                 totalSpent: 2840.50,
//                 loyaltyPoints: 1520,
//                 favoriteRestaurants: ["Tony's Pizza Palace", "Sakura Sushi", "Mama's Italian Kitchen"],
//                 dietaryPreferences: ["Vegetarian Friendly", "Low Sodium", "Organic Options"],
//                 allergies: ["Nuts", "Shellfish"],
//                 deliveryAddresses: [
//                     { label: "Home", address: "2456 Oak Avenue, Apt 4B, Austin, TX 78704", isDefault: true },
//                     { label: "Work", address: "789 Business Plaza, Suite 201, Austin, TX 78701", isDefault: false },
//                     { label: "Mom's House", address: "1234 Elm Street, Cedar Park, TX 78613", isDefault: false }
//                 ],
//                 recentOrders: [
//                     { restaurant: "Tony's Pizza Palace", items: "Large Margherita Pizza, Garlic Bread", amount: 28.50, date: "2 days ago", rating: 5 },
//                     { restaurant: "Sakura Sushi", items: "Dragon Roll, Miso Soup, Edamame", amount: 35.80, date: "1 week ago", rating: 4 },
//                     { restaurant: "Green Bowl Salads", items: "Mediterranean Bowl, Fresh Juice", amount: 18.90, date: "1 week ago", rating: 5 }
//                 ]
//             });
//             setLoading(false);
//         };
//         fetchProfile();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
//                 <div className="text-center bg-white p-6 rounded-xl shadow-lg">
//                     <p className="text-red-600 font-bold">Failed to load profile</p>
//                     <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const getInitials = (name: string) => {
//         return name.split(' ').map(n => n[0]).join('').toUpperCase();
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white rounded-xl shadow-lg border border-orange-200 mb-6 overflow-hidden"
//                 >
//                     <div className="bg-gradient-to-r from-orange-500 to-red-500 h-24"></div>

//                     <div className="px-6 pb-6 -mt-12 relative">
//                         <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
//                             <div className="w-24 h-24 bg-orange-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
//                                 <span className="text-white text-2xl font-bold">{getInitials(user.name)}</span>
//                             </div>

//                             <div className="text-center md:text-left flex-1">
//                                 <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
//                                 <p className="text-lg text-orange-600 font-semibold">{user.membershipTier}</p>
//                                 <p className="text-gray-600 text-sm">{user.email} • {user.phone}</p>
//                             </div>

//                             <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
//                                 🎁 Redeem Points
//                             </button>
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* Tabs */}
//                 <div className="bg-white rounded-lg shadow-lg border border-orange-200 mb-6">
//                     <div className="flex border-b overflow-x-auto">
//                         {[
//                             { id: 'profile', label: 'Profile', icon: '👤' },
//                             { id: 'orders', label: 'Orders', icon: '📋' },
//                             { id: 'addresses', label: 'Addresses', icon: '📍' },
//                             { id: 'preferences', label: 'Preferences', icon: '🍽️' }
//                         ].map((tab) => (
//                             <button
//                                 key={tab.id}
//                                 onClick={() => setActiveTab(tab.id as any)}
//                                 className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.id
//                                         ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
//                                         : 'text-gray-600 hover:text-orange-600'
//                                     }`}
//                             >
//                                 {tab.icon} {tab.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <motion.div
//                     key={activeTab}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="space-y-6"
//                 >
//                     {activeTab === 'profile' && (
//                         <>
//                             {/* Stats */}
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <div className="bg-white p-4 rounded-lg shadow border border-orange-200">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <p className="text-gray-600">Total Orders</p>
//                                             <p className="text-2xl font-bold text-orange-600">{user.totalOrders}</p>
//                                         </div>
//                                         <span className="text-3xl">🛒</span>
//                                     </div>
//                                 </div>

//                                 <div className="bg-white p-4 rounded-lg shadow border border-orange-200">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <p className="text-gray-600">Total Spent</p>
//                                             <p className="text-2xl font-bold text-orange-600">${user.totalSpent}</p>
//                                         </div>
//                                         <span className="text-3xl">💰</span>
//                                     </div>
//                                 </div>

//                                 <div className="bg-white p-4 rounded-lg shadow border border-orange-200">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <p className="text-gray-600">Loyalty Points</p>
//                                             <p className="text-2xl font-bold text-orange-600">{user.loyaltyPoints}</p>
//                                         </div>
//                                         <span className="text-3xl">⭐</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Favorite Restaurants */}
//                             <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">❤️ Favorite Restaurants</h3>
//                                 <div className="space-y-3">
//                                     {user.favoriteRestaurants.map((restaurant, index) => (
//                                         <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
//                                             <span className="font-medium">{restaurant}</span>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Order Again
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </>
//                     )}

//                     {activeTab === 'orders' && (
//                         <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
//                             <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Recent Orders</h3>
//                             <div className="space-y-4">
//                                 {user.recentOrders.map((order, index) => (
//                                     <div key={index} className="border rounded-lg p-4">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <div>
//                                                 <h4 className="font-bold">{order.restaurant}</h4>
//                                                 <p className="text-gray-600 text-sm">{order.items}</p>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-orange-600">${order.amount}</p>
//                                                 <p className="text-sm text-gray-500">{order.date}</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex justify-between items-center">
//                                             <div className="flex">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <span key={i} className={i < order.rating ? "text-yellow-400" : "text-gray-300"}>⭐</span>
//                                                 ))}
//                                             </div>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Reorder
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'addresses' && (
//                         <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-xl font-bold text-gray-900">📍 Delivery Addresses</h3>
//                                 <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
//                                     + Add Address
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 {user.deliveryAddresses.map((address, index) => (
//                                     <div key={index} className={`border-2 rounded-lg p-4 ${address.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
//                                         <div className="flex justify-between items-start">
//                                             <div>
//                                                 <h4 className="font-bold">{address.label}</h4>
//                                                 {address.isDefault && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Default</span>}
//                                                 <p className="text-gray-600 text-sm mt-1">{address.address}</p>
//                                             </div>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Deliver Here
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'preferences' && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">🥗 Dietary Preferences</h3>
//                                 <div className="space-y-2">
//                                     {user.dietaryPreferences.map((pref, index) => (
//                                         <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
//                                             <span className="text-green-500">✓</span>
//                                             <span>{pref}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="bg-white rounded-lg shadow border border-orange-200 p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Allergies</h3>
//                                 <div className="space-y-2">
//                                     {user.allergies.map((allergy, index) => (
//                                         <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
//                                             <span className="text-red-500">⚠️</span>
//                                             <span>{allergy}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default FoodDeliveryProfile;


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// interface UserProfile {
//     name: string;
//     email: string;
//     phone: string;
//     membershipTier: string;
//     totalOrders: number;
//     totalSpent: number;
//     loyaltyPoints: number;
//     favoriteRestaurants: string[];
//     dietaryPreferences: string[];
//     allergies: string[];
//     deliveryAddresses: Array<{
//         label: string;
//         address: string;
//         isDefault: boolean;
//     }>;
//     recentOrders: Array<{
//         restaurant: string;
//         items: string;
//         amount: number;
//         date: string;
//         rating: number;
//     }>;
// }

// const FoodDeliveryProfile: React.FC = () => {
//     const [user, setUser] = useState<UserProfile | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'preferences'>('profile');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             setUser({
//                 name: "Ananya Sharma",
//                 email: "ananya.sharma@email.com",
//                 phone: "+91-9876543210",
//                 membershipTier: "Gold Member",
//                 totalOrders: 158,
//                 totalSpent: 19890.75,
//                 loyaltyPoints: 2260,
//                 favoriteRestaurants: ["Biryani Blues", "Haldiram’s", "Punjabi Tadka"],
//                 dietaryPreferences: ["Pure Veg", "Low Oil", "Home-style Meals"],
//                 allergies: ["Peanuts", "Milk"],
//                 deliveryAddresses: [
//                     { label: "Home", address: "Flat 204, Tower C, Lotus Boulevard, Noida, UP", isDefault: true },
//                     { label: "Office", address: "WeWork, Sector 18, Noida", isDefault: false },
//                     { label: "Parent's Home", address: "House No. 45, Lajpat Nagar, Delhi", isDefault: false }
//                 ],
//                 recentOrders: [
//                     { restaurant: "Biryani Blues", items: "Hyderabadi Biryani, Raita", amount: 320, date: "2 days ago", rating: 5 },
//                     { restaurant: "Haldiram’s", items: "Chole Bhature, Raj Kachori, Lassi", amount: 270, date: "1 week ago", rating: 4 },
//                     { restaurant: "The Masala Pot", items: "Paneer Butter Masala, Tandoori Roti", amount: 360, date: "1 week ago", rating: 5 }
//                 ]
//             });
//             setLoading(false);
//         };
//         fetchProfile();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-orange-50">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
//             </div>
//         );
//     }

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-orange-50">
//                 <div className="text-center bg-white p-6 rounded-xl shadow-lg">
//                     <p className="text-red-600 font-bold">Failed to load profile</p>
//                     <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

//     return (
//         <div className="min-h-screen  py-6 px-4">
//             <div className="max-w-6xl mx-auto">
//                 <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow border mb-6 overflow-hidden">
//                     <div className="bg-orange-500 h-24"></div>
//                     <div className="px-6 pb-6 -mt-12 relative">
//                         <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
//                             <div className="w-24 h-24 bg-orange-600 rounded-full border-4 border-white shadow flex items-center justify-center">
//                                 <span className="text-white text-2xl font-bold">{getInitials(user.name)}</span>
//                             </div>
//                             <div className="text-center md:text-left flex-1">
//                                 <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
//                                 <p className="text-lg text-orange-600 font-semibold">{user.membershipTier}</p>
//                                 <p className="text-sm text-gray-600">{user.email} • {user.phone}</p>
//                             </div>
//                             <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
//                                 🎁 Redeem Points
//                             </button>
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* Tabs */}
//                 <div className="bg-white rounded-lg shadow border mb-6">
//                     <div className="flex border-b overflow-x-auto">
//                         {[
//                             { id: 'profile', label: 'Profile', icon: '👤' },
//                             { id: 'orders', label: 'Orders', icon: '📋' },
//                             { id: 'addresses', label: 'Addresses', icon: '📍' },
//                             { id: 'preferences', label: 'Preferences', icon: '🍽️' }
//                         ].map((tab) => (
//                             <button
//                                 key={tab.id}
//                                 onClick={() => setActiveTab(tab.id as any)}
//                                 className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.id
//                                         ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-100'
//                                         : 'text-gray-600 hover:text-orange-600'
//                                     }`}
//                             >
//                                 {tab.icon} {tab.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//                     {activeTab === 'profile' && (
//                         <>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 {[
//                                     { title: 'Total Orders', value: user.totalOrders, icon: '🛒' },
//                                     { title: 'Total Spent', value: `₹${user.totalSpent.toFixed(2)}`, icon: '💰' },
//                                     { title: 'Loyalty Points', value: user.loyaltyPoints, icon: '⭐' }
//                                 ].map((stat, i) => (
//                                     <div key={i} className="bg-white p-4 rounded-lg shadow border border-orange-200">
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <p className="text-gray-600">{stat.title}</p>
//                                                 <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
//                                             </div>
//                                             <span className="text-3xl">{stat.icon}</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="bg-white rounded-lg shadow border p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">❤️ Favorite Restaurants</h3>
//                                 <div className="space-y-3">
//                                     {user.favoriteRestaurants.map((restaurant, index) => (
//                                         <div key={index} className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
//                                             <span className="font-medium">{restaurant}</span>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Order Again
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </>
//                     )}

//                     {activeTab === 'orders' && (
//                         <div className="bg-white rounded-lg shadow border p-6">
//                             <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Recent Orders</h3>
//                             <div className="space-y-4">
//                                 {user.recentOrders.map((order, index) => (
//                                     <div key={index} className="border rounded-lg p-4">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <div>
//                                                 <h4 className="font-bold">{order.restaurant}</h4>
//                                                 <p className="text-gray-600 text-sm">{order.items}</p>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="font-bold text-orange-600">₹{order.amount}</p>
//                                                 <p className="text-sm text-gray-500">{order.date}</p>
//                                             </div>
//                                         </div>
//                                         <div className="flex justify-between items-center">
//                                             <div className="flex">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <span key={i} className={i < order.rating ? "text-yellow-400" : "text-gray-300"}>⭐</span>
//                                                 ))}
//                                             </div>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Reorder
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'addresses' && (
//                         <div className="bg-white rounded-lg shadow border p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-xl font-bold text-gray-900">📍 Delivery Addresses</h3>
//                                 <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Add Address</button>
//                             </div>
//                             <div className="space-y-4">
//                                 {user.deliveryAddresses.map((address, index) => (
//                                     <div key={index} className={`border-2 rounded-lg p-4 ${address.isDefault ? 'border-orange-500 bg-orange-100' : 'border-gray-200'}`}>
//                                         <div className="flex justify-between items-start">
//                                             <div>
//                                                 <h4 className="font-bold">{address.label}</h4>
//                                                 {address.isDefault && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2">Default</span>}
//                                                 <p className="text-gray-600 text-sm mt-1">{address.address}</p>
//                                             </div>
//                                             <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
//                                                 Deliver Here
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'preferences' && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="bg-white rounded-lg shadow border p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">🥗 Dietary Preferences</h3>
//                                 <div className="space-y-2">
//                                     {user.dietaryPreferences.map((pref, index) => (
//                                         <div key={index} className="flex items-center gap-2 p-2 bg-orange-100 rounded">
//                                             <span className="text-orange-600">✓</span>
//                                             <span>{pref}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="bg-white rounded-lg shadow border p-6">
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Allergies</h3>
//                                 <div className="space-y-2">
//                                     {user.allergies.map((allergy, index) => (
//                                         <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
//                                             <span className="text-red-500">⚠️</span>
//                                             <span>{allergy}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default FoodDeliveryProfile;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    membershipTier: string;
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints: number;
    favoriteRestaurants: string[];
    dietaryPreferences: string[];
    allergies: string[];
    deliveryAddresses: Array<{
        label: string;
        address: string;
        isDefault: boolean;
    }>;
    recentOrders: Array<{
        restaurant: string;
        items: string;
        amount: number;
        date: string;
        rating: number;
    }>;
}

const FoodDeliveryProfile: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'preferences'>('profile');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
               
                const userId ="682adb9df49146b3a410e478";
                const response = await fetch(`http://localhost:9008/api/profile/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${yourToken}` // if needed
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                setUser(data); // Make sure API returns data matching UserProfile
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="text-center bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-red-600 font-bold">Failed to load profile</p>
                    <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="min-h-screen py-6 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow border mb-6 overflow-hidden">
                    <div className="bg-orange-500 h-24"></div>
                    <div className="px-6 pb-6 -mt-12 relative">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                            <div className="w-24 h-24 bg-orange-600 rounded-full border-4 border-white shadow flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{getInitials(user.name)}</span>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-lg text-orange-600 font-semibold">{user.membershipTier}</p>
                                <p className="text-sm text-gray-600">{user.email} • {user.phone}</p>
                            </div>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                                🎁 Redeem Points
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white rounded-lg shadow border mb-6">
                    <div className="flex border-b overflow-x-auto">
                        {[
                            { id: 'profile', label: 'Profile', icon: '👤' },
                            { id: 'orders', label: 'Orders', icon: '📋' },
                            { id: 'addresses', label: 'Addresses', icon: '📍' },
                            { id: 'preferences', label: 'Preferences', icon: '🍽️' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-100'
                                    : 'text-gray-600 hover:text-orange-600'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {activeTab === 'profile' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: 'Total Orders', value: user.totalOrders, icon: '🛒' },
                                    { title: 'Total Spent', value: `₹${user.totalSpent.toFixed(2)}`, icon: '💰' },
                                    { title: 'Loyalty Points', value: user.loyaltyPoints, icon: '⭐' }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow border border-orange-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-600">{stat.title}</p>
                                                <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
                                            </div>
                                            <span className="text-3xl">{stat.icon}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-lg shadow border p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">❤️ Favorite Restaurants</h3>
                                <div className="space-y-3">
                                    {user.favoriteRestaurants.map((restaurant, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                                            <span className="font-medium">{restaurant}</span>
                                            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                                                Order Again
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-lg shadow border p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Recent Orders</h3>
                            <div className="space-y-4">
                                {user.recentOrders.map((order, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold">{order.restaurant}</h4>
                                                <p className="text-gray-600 text-sm">{order.items}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-orange-600">₹{order.amount}</p>
                                                <p className="text-sm text-gray-500">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < order.rating ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                                                ))}
                                            </div>
                                            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                                                Reorder
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="bg-white rounded-lg shadow border p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900">📍 Delivery Addresses</h3>
                                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">+ Add Address</button>
                            </div>
                            <div className="space-y-4">
                                {user.deliveryAddresses.map((address, index) => (
                                    <div key={index} className={`border-2 rounded-lg p-4 ${address.isDefault ? 'border-orange-500 bg-orange-100' : 'border-gray-200'}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold">{address.label}</h4>
                                                {address.isDefault && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2">Default</span>}
                                                <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                                            </div>
                                            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                                                Deliver Here
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow border p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">🥗 Dietary Preferences</h3>
                                <div className="space-y-2">
                                    {user.dietaryPreferences.map((pref, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-orange-100 rounded">
                                            <span className="text-orange-600">✓</span>
                                            <span>{pref}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow border p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Allergies</h3>
                                <div className="space-y-2">
                                    {user.allergies.map((allergy, index) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                                            <span className="text-red-500">⚠️</span>
                                            <span>{allergy}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default FoodDeliveryProfile;
