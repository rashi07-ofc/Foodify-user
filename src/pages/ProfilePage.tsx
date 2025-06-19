import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  country: string;
  image?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchProfile();
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

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-orange-600 mb-6 text-center">My Profile</h2>

        {message && <div className="text-green-600 mb-4 text-center">{message}</div>}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        {editMode && formData ? (
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="date" name="date_of_birth" value={formData.date_of_birth?.substring(0, 10)} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 col-span-2" />
              <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 col-span-2" />
              <input type="text" name="image" placeholder="Image URL" value={formData.image || ""} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 col-span-2" />
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleSubmitEdit} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg">
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
              <div>
                <p className="text-sm">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm">Gender</p>
                <p className="font-medium capitalize">{profile.gender}</p>
              </div>
              <div>
                <p className="text-sm">Date of Birth</p>
                <p className="font-medium">{profile.date_of_birth.substring(0, 10)}</p>
              </div>
              <div>
                <p className="text-sm">Country</p>
                <p className="font-medium">{profile.country}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setEditMode(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
                Edit Profile
              </button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
                Delete Account
              </button>
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
