import React, { useEffect, useState } from "react";
import axios from "axios";
import type { UserProfile, Address } from "../types";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:9000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setFormData(response.data);
    } catch (err: any) {
      setError("Failed to fetch profile: " + err.message);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:9000/address/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(res.data);
    } catch (err: any) {
      setError("Failed to fetch addresses: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:9000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Profile deleted successfully.");
      setProfile(null);
    } catch (err: any) {
      setError("Failed to delete profile: " + err.message);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auth/logout-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogoutMessage("Logged out from all devices successfully.");
    } catch (err: any) {
      setError("Logout failed: " + err.message);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      if (!formData) return;

      const payload = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth,
        country: formData.country,
        image: formData.image || "",
      };

      await axios.patch("http://localhost:9000/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchProfile();
      setEditMode(false);
      setMessage("Profile updated successfully.");
    } catch (err: any) {
      setError("Failed to update profile: " + err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingAddress) return;
    setEditingAddress({
      ...editingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateAddress = async () => {
  if (!editingAddress) return;

  const latitude = parseFloat(localStorage.getItem("userLat") || "0");
  const longitude = parseFloat(localStorage.getItem("userLon") || "0");

  try {
    setUpdating(true);

    const payload = {
      ...editingAddress,
      latitude,
      longitude,
    };

    await axios.put("http://localhost:9000/address/user", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("Address updated successfully.");
    setEditingAddress(null);
    await fetchAddresses();
  } catch (err: any) {
    setError("Failed to update address: " + err.message);
  } finally {
    setUpdating(false);
  }
};


  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center">My Profile</h2>

        {message && <div className="text-green-600 mb-4 text-center">{message}</div>}
        {logoutMessage && <div className="text-blue-600 mb-4 text-center">{logoutMessage}</div>}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        {editMode && formData ? (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="border rounded px-4 py-2" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded px-4 py-2" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border rounded px-4 py-2" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded px-4 py-2">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="date" name="date_of_birth" value={formData.date_of_birth?.substring(0, 10)} onChange={handleChange} className="border rounded px-4 py-2 col-span-2" />
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="border rounded px-4 py-2 col-span-2" />
              <input type="text" name="image" value={formData.image || ""} onChange={handleChange} className="border rounded px-4 py-2 col-span-2" />
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={handleSubmitEdit} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
              <button onClick={() => setEditMode(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        ) : profile ? (
          <div className="space-y-5">
            <div className="flex items-center space-x-4">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-xl">
                  {profile.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{profile.username}</h3>
                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div><p className="text-sm">Phone</p><p className="font-medium">{profile.phone}</p></div>
              <div><p className="text-sm">Gender</p><p className="font-medium capitalize">{profile.gender}</p></div>
              <div><p className="text-sm">Date of Birth</p><p className="font-medium">{profile.date_of_birth?.substring(0, 10)}</p></div>
              <div><p className="text-sm">Country</p><p className="font-medium">{profile.country}</p></div>
            </div>

            <div className="flex justify-between mt-6 flex-wrap gap-3">
              <button onClick={() => setEditMode(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">Edit Profile</button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">Delete Account</button>
              <button onClick={handleLogoutAll} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Logout from all devices</button>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Saved Addresses</h4>
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr._id} className="border rounded-lg p-4 shadow-sm bg-gray-50 relative">
                      {editingAddress?._id === addr._id ? (
                        <div className="space-y-2">
                          <input name="label" value={editingAddress.label} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="Label" />
                          <input name="house_no" value={editingAddress.house_no} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="House No" />
                          <input name="address_location_1" value={editingAddress.address_location_1} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="Address 1" />
                          <input name="address_location_2" value={editingAddress.address_location_2} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="Address 2" />
                          <input name="city" value={editingAddress.city} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="City" />
                          <input name="postal_code" value={editingAddress.postal_code} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="Postal Code" />
                          <input name="country" value={editingAddress.country} onChange={handleAddressChange} className="w-full border rounded px-3 py-1" placeholder="Country" />
                          <div className="flex gap-2 mt-2">
                            <button onClick={handleUpdateAddress} className="bg-green-500 text-white px-4 py-1 rounded" disabled={updating}>
                              {updating ? "Saving..." : "Save"}
                            </button>
                            <button onClick={() => setEditingAddress(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setEditingAddress(addr)} className="absolute top-2 right-2 text-sm text-orange-600 hover:underline">✏️ Edit</button>
                          <p className="font-semibold text-orange-600">{addr.label}</p>
                          <p>{addr.house_no}, {addr.address_location_1}</p>
                          {addr.address_location_2 && <p>{addr.address_location_2}</p>}
                          <p>{addr.city}, {addr.postal_code}</p>
                          <p>{addr.country}</p>
                          <p className="text-sm text-gray-500">Coordinates: {addr.latitude}, {addr.longitude}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No saved addresses found.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
