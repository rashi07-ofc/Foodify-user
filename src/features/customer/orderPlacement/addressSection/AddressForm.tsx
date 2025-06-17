// AddressForm.tsx
import React, { useState } from "react";
import axios from "../../../../api/axios"; // Your configured axios instance
import { getAuthToken } from "../../../auth/authService"; // Your auth token helper
import type { DeliveryAddress } from "../../../../types"; // Ensure this type is accurate for your API

interface AddressFormProps {
  address: DeliveryAddress; // The address object being edited/added
  isEditing: boolean;
  onInputChange: (field: keyof DeliveryAddress, value: string | number) => void; // Value can be string or number (for postal_code)
  onSaveSuccess: () => void; // Callback to parent on successful save
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  isEditing,
  onInputChange,
  onSaveSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function for client-side validation
  const validateForm = () => {
    if (!address.label) return "Please select an address label.";
    if (!address.address_location_1 || address.address_location_1.trim() === "") return "Street Address Line 1 is required.";
    if (!address.city || address.city.trim() === "") return "City is required.";
    if (!address.postal_code || isNaN(Number(address.postal_code))) return "Zip Code (Postal Code) is required and must be a number.";
    if (!address.country || address.country.trim() === "") return "Country is required.";

    // No need to validate latitude/longitude from form inputs, as they come from localStorage
    return null; // No errors
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        alert("You must be logged in to save an address.");
        setLoading(false);
        return;
      }

      // Retrieve latitude and longitude from localStorage
      const storedLatitude = localStorage.getItem('userLat');
      const storedLongitude = localStorage.getItem('userLon');

      const latitude = storedLatitude ? parseFloat(storedLatitude) : 0;
      const longitude = storedLongitude ? parseFloat(storedLongitude) : 0;

      // Construct the payload directly from the provided request body structure
      const payload: Omit<DeliveryAddress, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'user_id'> = {
        label: address.label || "Other",
        house_no: address.house_no || "",
        address_location_1: address.address_location_1,
        address_location_2: address.address_location_2 || "",
        postal_code: Number(address.postal_code),
        city: address.city,
        country: address.country,
        latitude: latitude, // Get from localStorage
        longitude: longitude, // Get from localStorage
      };
      
      if (isEditing) {        
        // Update existing address (PUT request)
        if (!address._id) {
          throw new Error("Cannot update address: Missing address ID.");
        }
        await axios.put(
          `http://localhost:9000/address`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Address updated successfully!");
      } else {
        // Add new address (POST request)
        await axios.post(
          "http://localhost:9000/address",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Address added successfully!");
      }
      onSaveSuccess(); // Notify parent that save was successful
    } catch (err) {
      console.error("Error saving address:", err);
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.message
                           ? err.response.data.message
                           : "Failed to save address. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-sm"
          disabled={loading}
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Address Label Field */}
      <div className="mb-4">
        <label htmlFor="address-label" className="block text-sm font-medium text-gray-700 mb-2">
          Address Label *
        </label>
        <select
          id="address-label"
          value={address.label || ""}
          onChange={(e) => onInputChange("label", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
          disabled={loading}
          required
        >
          <option value="">Select label</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* House No Field */}
      <div className="mb-4">
        <label htmlFor="house-no" className="block text-sm font-medium text-gray-700 mb-2">
          House No. / Flat No.
        </label>
        <input
          id="house-no"
          type="text"
          value={address.house_no || ""}
          onChange={(e) => onInputChange("house_no", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
          placeholder="e.g., H-342, Apt. 101"
          disabled={loading}
        />
      </div>

      {/* Street Address Line 1 (address_location_1) */}
      <div className="mb-4">
        <label htmlFor="address-location-1" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address Line 1 *
        </label>
        <input
          id="address-location-1"
          type="text"
          value={address.address_location_1 || ""}
          onChange={(e) => onInputChange("address_location_1", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
          placeholder="e.g., Sector 65, Main Road"
          required
          disabled={loading}
        />
      </div>

      {/* Street Address Line 2 (address_location_2) */}
      <div className="mb-4">
        <label htmlFor="address-location-2" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address Line 2 (Optional)
        </label>
        <input
          id="address-location-2"
          type="text"
          value={address.address_location_2 || ""}
          onChange={(e) => onInputChange("address_location_2", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
          placeholder="e.g., Near City Center"
          disabled={loading}
        />
      </div>

      {/* City and Zip Code Fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            id="city"
            type="text"
            value={address.city || ""}
            onChange={(e) => onInputChange("city", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter city"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 mb-2">
            Zip Code (Postal Code) *
          </label>
          <input
            id="postal-code"
            type="text"
            value={address.postal_code ? String(address.postal_code) : ""}
            onChange={(e) => onInputChange("postal_code", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter zip code"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Country Field */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
          Country *
        </label>
        <input
          id="country"
          type="text"
          value={address.country || ""}
          onChange={(e) => onInputChange("country", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
          placeholder="Enter country"
          required
          disabled={loading}
        />
      </div>

      {/* Latitude and Longitude Fields REMOVED - now from localStorage */}
      {/* You might consider adding a small text indicating that location is based on current device location */}
      {!isEditing && ( // Only show this message when adding a new address
        <p className="text-sm text-gray-500 mb-4">
          Your location (latitude and longitude) will be automatically saved based on your current device location.
        </p>
      )}

      {/* Save/Update Button */}
      <button
        onClick={handleSave}
        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {isEditing ? "Updating..." : "Saving..."}
          </>
        ) : (
          isEditing ? "Update Address" : "Save Address"
        )}
      </button>
    </div>
  );
};

export default AddressForm;