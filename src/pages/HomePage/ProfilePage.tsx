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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        name: "Ananya Sharma",
        email: "ananya.sharma@email.com",
        phone: "+91-9876543210",
        membershipTier: "Gold Member",
        totalOrders: 158,
        totalSpent: 19890.75,
        loyaltyPoints: 2260,
        favoriteRestaurants: ["Biryani Blues", "Haldiram’s", "Punjabi Tadka"],
        dietaryPreferences: ["Pure Veg", "Low Oil", "Home-style Meals"],
        allergies: ["Peanuts", "Milk"],
        deliveryAddresses: [
          { label: "Home", address: "Flat 204, Tower C, Lotus Boulevard, Noida, UP", isDefault: true },
          { label: "Office", address: "WeWork, Sector 18, Noida", isDefault: false },
          { label: "Parent's Home", address: "House No. 45, Lajpat Nagar, Delhi", isDefault: false }
        ],
        recentOrders: [
          { restaurant: "Biryani Blues", items: "Hyderabadi Biryani, Raita", amount: 320, date: "2 days ago", rating: 5 },
          { restaurant: "Haldiram’s", items: "Chole Bhature, Raj Kachori, Lassi", amount: 270, date: "1 week ago", rating: 4 },
          { restaurant: "The Masala Pot", items: "Paneer Butter Masala, Tandoori Roti", amount: 360, date: "1 week ago", rating: 5 }
        ]
      });
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

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
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
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

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow border mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'orders', label: 'Orders', icon: '📋' },
              { id: 'addresses', label: 'Addresses', icon: '📍' },
              { id: 'preferences', label: 'Preferences', icon: '🍽' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap ${activeTab === tab.id ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-100' : 'text-gray-600 hover:text-orange-600'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
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
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  + Add Address
                </button>
              </div>
              <div className="space-y-4">
                {user.deliveryAddresses.map((address, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 ${address.isDefault ? 'border-orange-500 bg-orange-100' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{address.label}</h4>
                        {address.isDefault && (
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full ml-2">Default</span>
                        )}
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