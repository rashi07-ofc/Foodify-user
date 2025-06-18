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
    image: string; // This will store the URL of the image
}

const ProfilePage: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading,setLoading]=useState("");
    const [user,setUser]=useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false); // New state for upload loading
    const [formData, setFormData] = useState<UserProfile>({
        username: "",
        phone: "",
        gender: "male",
        email: "",
        date_of_birth: "",
        country: "India",
        image: "",
    });
    const [tempPhoto, setTempPhoto] = useState<string | null>(null); // For local preview before API upload
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- API Base URL ---
    const API_BASE_URL = "http://localhost:9000";
    const token = localStorage.getItem("accessToken");

    // Fetch user data from API using Axios
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<UserProfile>(`${API_BASE_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCurrentUser(response.data);
                setFormData(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
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
                        setCurrentUser(null);
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
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- MODIFIED handlePhotoChange for API upload ---
    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Image size should be less than 2MB");
                // Clear the input field to allow selecting another file
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }

            // Show local preview immediately
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setTempPhoto(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);

            // --- API Upload Logic ---
            setIsUploading(true);
            const formDataToUpload = new FormData();
            formDataToUpload.append('profileImage', file); // 'profileImage' MUST match the field name your backend expects

            try {
                // Adjust endpoint if needed, based on your backend logic (e.g., if it takes user ID)
                const response = await axios.post<{ imageUrl: string }>(
                    `${API_BASE_URL}/profile/upload`,
                    formDataToUpload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        },
                        // You might need to send authentication headers too
                        // withCredentials: true, // If handling cookies/sessions
                    }
                );

                // Assuming your API returns the URL of the uploaded image
                setFormData((prev) => ({ ...prev, image: response.data.imageUrl }));
                // Clear tempPhoto once the image is successfully uploaded and set to formData.image
                setTempPhoto(null);
                alert("Profile image uploaded successfully!");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error uploading image:", error.response?.data || error.message);
                    alert(`Failed to upload image: ${error.response?.data?.message || error.message}`);
                } else {
                    console.error("Non-Axios error uploading image:", error);
                    alert("An unexpected error occurred while uploading image.");
                }
                // If upload fails, revert tempPhoto or reset image state if desired
                setTempPhoto(null);
            } finally {
                setIsUploading(false);
                // Always clear the input field value to allow re-uploading the same file
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleRemovePhoto = async () => {
        // Optimistic UI update
        const originalImage = formData.image;
        setTempPhoto(null);
        setFormData((prev) => ({ ...prev, image: "" }));

        try {
            // Make an API call to delete the image from the server if it exists
            if (originalImage) {
                // Assuming your backend has an endpoint to remove an image
                // This might be a DELETE request or a PATCH/PUT to update the user's image field to null
                // Example: DELETE /profile/image or PATCH /profile { image: null }
                await axios.delete(`${API_BASE_URL}/profile/image`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { imageUrl: originalImage } // Send the URL to be deleted if your API needs it
                });
                alert("Profile image removed successfully!");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error removing image:", error.response?.data || error.message);
                alert(`Failed to remove image: ${error.response?.data?.message || error.message}`);
            } else {
                console.error("Non-Axios error removing image:", error);
                alert("An unexpected error occurred while removing image.");
            }
            // Revert on error
            setFormData((prev) => ({ ...prev, image: originalImage }));
            setTempPhoto(originalImage);
        }
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
        if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            alert("Please enter a valid phone number (10-15 digits, optional +).");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        // Do not include `tempPhoto` here, as it's just for local preview.
        // `formData.image` already holds the URL of the image after `handlePhotoChange` is done.
        const dataToSave = { ...formData };

        try {
            // Determine if it's a new profile or an update
            // if (currentUser?.id) {
                // Use axios.patch for updating existing profile
                const response = await axios.patch<UserProfile>(
                    `${API_BASE_URL}/profile`, // Assuming PATCH endpoint expects ID in path for existing profiles
                    dataToSave,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCurrentUser(response.data);
                setFormData(response.data);
            // } else {
            //     // Use axios.post for creating a new profile
            //     const response = await axios.post<UserProfile>(
            //         `${API_BASE_URL}/profile`,
            //         dataToSave,
            //         { headers: { Authorization: `Bearer ${token}` } }
            //     );
            //     setCurrentUser(response.data);
            //     setFormData(response.data);
            // }
            setIsEditing(false);
            // setTempPhoto(null); // tempPhoto should already be null from handlePhotoChange if upload succeeded
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
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your profile? This action cannot be undone."
        );

        if (confirmDelete) {
            setIsLoading(true);
            try {
                // Use axios.delete for deleting profile
                // You might need to send the user ID in the path if your API is /profile/:id
                await axios.delete(`${API_BASE_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
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
        }
    };

    const handleCancel = () => {
        if (currentUser) {
            setFormData(currentUser); // Revert to current user data
        } else {
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

    if (isLoading && !isEditing && !isUploading) { // Added isUploading to loading state
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

  if (loading) {
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

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl border-2 border-orange-200">
                    <div className="h-48 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-orange-600/80"></div>
                    </div>

                    <div className="relative px-6 sm:px-8 pb-10">
                        <div className="flex justify-center -mt-24 mb-8">
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-full border-6 border-white bg-orange-50 overflow-hidden shadow-2xl">
                                    {/* Display priority: tempPhoto (for immediate preview) -> formData.image (uploaded) -> default FaUser */}
                                    {isUploading ? ( // Show spinner if uploading
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <FaSpinner className="animate-spin text-4xl text-orange-500" />
                                        </div>
                                    ) : tempPhoto ? (
                                        <img
                                            src={tempPhoto}
                                            alt="Temporary Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : formData.image ? ( // Check formData.image after tempPhoto
                                        <img
                                            src={formData.image}
                                            alt="Profile"
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
                                        {/* Show remove button only if there's an image to remove */}
                                        {(tempPhoto || formData.image) && (
                                            <button
                                                onClick={handleRemovePhoto}
                                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-lg hover:scale-110"
                                                aria-label="Remove profile photo"
                                                disabled={isUploading} // Disable during upload
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        )}
                                        <button
                                            onClick={triggerFileInput}
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:scale-110"
                                            aria-label="Change profile photo"
                                            disabled={isUploading} // Disable during upload
                                        >
                                            <FaCamera className="text-sm" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handlePhotoChange} // This handles the API upload
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
                                        disabled={isUploading} // Disable inputs during upload
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
                                        disabled={isUploading}
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
                                        disabled={isUploading}
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
                                        disabled={isUploading}
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
                                        disabled={isUploading}
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
                                        disabled={isUploading}
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
                                    disabled={isLoading || isUploading} // Disable if saving or uploading
                                    className={`flex items-center gap-3 text-white px-10 py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 ${isLoading || isUploading
                                        ? "bg-orange-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                                        }`}
                                >
                                    {(isLoading || isUploading) ? (
                                        <FaSpinner className="animate-spin text-xl" />
                                    ) : (
                                        <FaSave className="text-xl" />
                                    )}
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={isLoading || isUploading} // Disable if saving or uploading
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

export default ProfilePage;
