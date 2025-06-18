import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios
import {
    FaEdit,
    FaSave,
    FaCamera,
    FaTimes,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaBirthdayCake,
    FaGlobe,
    FaVenusMars,
    FaSpinner,
    FaTrash,
} from "react-icons/fa";

// Define the UserProfile interface
interface UserProfile {
    id?: string; // id is optional, especially for new profiles
    username: string;
    phone: string;
    gender: string;
    email: string;
    date_of_birth: string;
    country: string;
    image: string;
}

const ProfilePage: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<UserProfile>({
        username: "",
        phone: "",
        gender: "male",
        email: "",
        date_of_birth: "",
        country: "India",
        image: "",
    });
    const [tempPhoto, setTempPhoto] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- API Base URL ---
    // It's good practice to define this once, perhaps in an environment variable or a config file.
    const API_BASE_URL = "http://localhost:9000";
    const token = localStorage.getItem("accessToken");

    // Fetch user data from API using Axios
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                // Using axios.get
                const response = await axios.get<UserProfile>(`${API_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
                setCurrentUser(response.data);
                setFormData(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handle specific HTTP errors from Axios
                    if (error.response?.status === 404) {
                        console.warn("No profile found (404). Starting with a fresh profile.");
                        setCurrentUser(null);
                        setFormData({
                            username: "",
                            phone: "",
                            gender: "male",
                            email: "",
                            date_of_birth: "",
                            country: "India",
                            image: "",
                        });
                    } else {
                        console.error("Axios error fetching user profile:", error.response?.data || error.message);
                        alert(`Failed to fetch profile: ${error.response?.data?.message || error.message}`);
                        setCurrentUser(null); // Ensure currentUser is null on unhandled error
                    }
                } else {
                    console.error("Non-Axios error fetching user profile:", error);
                    alert("An unexpected error occurred while fetching profile.");
                    setCurrentUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array ensures this runs once on mount

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Image size should be less than 2MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setTempPhoto(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = () => {
        setTempPhoto(null);
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    const validateForm = (): boolean => {
        if (!formData.username.trim()) {
            alert("Username is required.");
            return false;
        }
        if (!formData.email.trim()) {
            alert("Email is required.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        if (!formData.phone.trim()) {
            alert("Phone number is required.");
            return false;
        }
        // Updated regex to allow optional '+' at the beginning for international numbers
        if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            alert("Please enter a valid phone number (10-15 digits, optional +).");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        const dataToSave = {
            ...formData,
            image: tempPhoto || formData.image, // Use tempPhoto if available, otherwise existing image
        };

        try {
            // Use axios.put for updating existing profile
            const response = await axios.patch<UserProfile>(
                `${API_BASE_URL}/profile/`, // Assuming your PUT endpoint expects ID in path
                dataToSave, { headers: { Authorization: `Bearer ${token}` } }
            );
            setCurrentUser(response.data);
            setFormData(response.data);
            // } else {
            //     // Use axios.post for creating a new profile
            //     const response = await axios.post<UserProfile>(
            //         `${API_BASE_URL}/profile`,
            //         dataToSave, {headers: {Authorization: `Bearer ${token}`}}
            //     );
            //     setCurrentUser(response.data);
            //     setFormData(response.data);
            // }
            setIsEditing(false);
            setTempPhoto(null); // Clear temporary photo after saving
            alert("Profile saved successfully!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error saving profile:", error.response?.data || error.message);
                alert(`Failed to save profile: ${error.response?.data?.message || error.message}`);
            } else {
                console.error("Non-Axios error saving profile:", error);
                alert("An unexpected error occurred while saving profile.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProfile = async () => {
        // if (!currentUser || !currentUser.id) {
        //     alert("No profile to delete.");
        //     return;
        // }

        // const confirmDelete = window.confirm(
        //     "Are you sure you want to delete your profile? This action cannot be undone."
        // );

        // if (confirmDelete) {
        setIsLoading(true);
        try {
            // Use axios.delete for deleting profile
            await axios.delete(`${API_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } }); // Assuming DELETE also takes ID
            setCurrentUser(null);
            setFormData({
                username: "",
                phone: "",
                gender: "male",
                email: "",
                date_of_birth: "",
                country: "India",
                image: "",
            });
            setTempPhoto(null);
            setIsEditing(false);
            alert("Profile deleted successfully!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error deleting profile:", error.response?.data || error.message);
                alert(`Failed to delete profile: ${error.response?.data?.message || error.message}`);
            } else {
                console.error("Non-Axios error deleting profile:", error);
                alert("An unexpected error occurred while deleting profile.");
            }
        } finally {
            setIsLoading(false);
        }
        // }
    };

    const handleCancel = () => {
        if (currentUser) {
            setFormData(currentUser); // Revert to current user data
        } else {
            // If no current user, reset to initial empty form data
            setFormData({
                username: "",
                phone: "",
                gender: "male",
                email: "",
                date_of_birth: "",
                country: "India",
                image: "",
            });
        }
        setTempPhoto(null);
        setIsEditing(false);
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return "Set your DOB";
        try {
            return new Date(dateString).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    // --- Conditional Rendering for Loading and No Profile State ---
    if (isLoading && !isEditing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
                <div className="text-center bg-white p-8 rounded-2xl shadow-2xl border border-orange-200">
                    <FaSpinner className="animate-spin text-6xl text-orange-500 mb-6 mx-auto" />
                    <p className="text-xl text-orange-700 font-semibold">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!currentUser && !isEditing) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
                <div className="text-center animate-fade-in max-w-md bg-white p-10 rounded-3xl shadow-2xl border-2 border-orange-200">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <FaUser className="text-white text-5xl" />
                    </div>
                    <h2 className="text-4xl font-bold text-orange-800 mb-4">
                        No Profile Found
                    </h2>
                    <p className="text-orange-600 mb-8 text-lg">
                        Create your profile to get started with our services and enjoy a
                        personalized experience.
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    // --- Main Profile Display/Edit View ---
    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-orange-800 mb-4">My Profile</h1>
                    <p className="text-orange-600 text-xl">
                        {isEditing
                            ? "Edit your profile information"
                            : "View and manage your profile"}
                    </p>
                </div>

                {/* Debug Panel - Show current form data */}
                {/* <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p><strong>Username:</strong> {formData.username}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Date of Birth:</strong> {formData.date_of_birth}</p>
            <p><strong>Is Editing:</strong> {isEditing ? "Yes" : "No"}</p>
        </div> */}

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl border-2 border-orange-200">
                    <div className="h-48 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-orange-600/80"></div>
                    </div>

                    <div className="relative px-6 sm:px-8 pb-10">
                        <div className="flex justify-center -mt-24 mb-8">
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-full border-6 border-white bg-orange-50 overflow-hidden shadow-2xl">
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : tempPhoto ? (
                                        <img
                                            onClick={handlePhotoChange}
                                            src={tempPhoto}
                                            alt="Temp Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                                            <FaUser className="text-orange-500 text-6xl" />
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="absolute bottom-2 right-2 flex gap-2">
                                        {(tempPhoto || formData.image) && (
                                            <button
                                                onClick={handleRemovePhoto}
                                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg hover:scale-110"
                                                aria-label="Remove profile photo"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        )}
                                        <button
                                            onClick={triggerFileInput}
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:scale-110"
                                            aria-label="Change profile photo"
                                        >
                                            <FaCamera className="text-sm" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handlePhotoChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isEditing && currentUser && (
                            <div className="flex justify-center gap-6 mb-10">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                                >
                                    <FaEdit className="text-lg" /> Edit Profile
                                </button>
                                <button
                                    onClick={handleDeleteProfile}
                                    className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                                >
                                    <FaTrash className="text-lg" /> Delete Profile
                                </button>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Username Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaUser className="text-orange-500 text-xl" />
                                    Username *
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                        placeholder="Enter your username"
                                        required
                                    />
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg border-2 border-orange-200">
                                        {currentUser?.username || "Set your username"}
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaEnvelope className="text-orange-500 text-xl" />
                                    Email *
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                        placeholder="Enter your email"
                                        required
                                    />
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg border-2 border-orange-200">
                                        {currentUser?.email || "Set your email"}
                                    </div>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaPhone className="text-orange-500 text-xl" />
                                    Phone *
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg border-2 border-orange-200">
                                        {currentUser?.phone || "Set your Phone number"}
                                    </div>
                                )}
                            </div>

                            {/* Gender Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaVenusMars className="text-orange-500 text-xl" />
                                    Gender
                                </label>
                                {isEditing ? (
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg capitalize border-2 border-orange-200">
                                        {currentUser?.gender || "Set your gender"}
                                    </div>
                                )}
                            </div>

                            {/* Date of Birth Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaBirthdayCake className="text-orange-500 text-xl" />
                                    Date of Birth
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                        max={new Date().toISOString().split('T')[0]} // Prevent future dates
                                    />
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg border-2 border-orange-200">
                                        {formatDate(currentUser?.date_of_birth || "")}
                                    </div>
                                )}
                            </div>

                            {/* Country Field */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 text-orange-700 font-bold text-lg">
                                    <FaGlobe className="text-orange-500 text-xl" />
                                    Country
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all text-lg bg-orange-50"
                                        placeholder="Your country"
                                    />
                                ) : (
                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl text-orange-800 font-semibold text-lg border-2 border-orange-200">
                                        {currentUser?.country || "Set your Country"}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Save/Cancel Buttons */}
                        {isEditing && (
                            <div className="flex justify-center gap-6 mt-12">
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className={`flex items-center gap-3 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 ${isLoading
                                        ? "bg-orange-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                                        }`}
                                >
                                    {isLoading ? (
                                        <FaSpinner className="animate-spin text-xl" />
                                    ) : (
                                        <FaSave className="text-xl" />
                                    )}
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="flex items-center gap-3 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-orange-800 px-10 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                                >
                                    <FaTimes className="text-xl" /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;