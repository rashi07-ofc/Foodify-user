// AddressList.tsx
import React, { useState, useEffect } from "react";
import { Edit2, Plus } from "lucide-react";

import type { DeliveryAddress } from "../../../../types"; 
import axios from "../../../../api/axios"; 
import { getAuthToken } from "../../../auth/authService"; 

interface AddressListProps {
  initialSelectedAddressId?: string | null;
  onSelect: (addressId: string) => void;
  onEdit: (addressId: string) => void;
  onAddNew: () => void;
}

const AddressList: React.FC<AddressListProps> = ({
  initialSelectedAddressId = null,
  onSelect,
  onEdit,
  onAddNew,
}) => {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  // Use _id for internal selection tracking
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(initialSelectedAddressId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        if (!token) {
          setError("Authentication required to load addresses.");
          setLoading(false);
          // Consider redirecting to login or showing a specific authentication message
          return;
        }

        // Use the correct API endpoint: http://localhost:9000/address
        const response = await axios.get<DeliveryAddress[]>(
          "http://localhost:9000/address/all", // <-- Updated API endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        

        setAddresses(response.data);

        // If no address is initially selected, and we have addresses, select the first one
        if (!initialSelectedAddressId && response.data.length > 0) {
          setSelectedAddressId(response.data[0]._id); // Use _id for selection
          onSelect(response.data[0]._id); // Notify parent using _id
        } else if (initialSelectedAddressId && !response.data.some(addr => addr._id === initialSelectedAddressId)) {
            // If an initial ID was given but it's not in the fetched list (e.g., deleted),
            // reset selection or default to first
            if (response.data.length > 0) {
                setSelectedAddressId(response.data[0]._id);
                onSelect(response.data[0]._id);
            } else {
                setSelectedAddressId(null);
                onSelect(''); // Notify parent that no address is selected
            }
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to load addresses. Please try again.");
        setAddresses([]);
        setSelectedAddressId(null);
        onSelect('');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [initialSelectedAddressId, onSelect]); 

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    onSelect(addressId); // Call the prop function to notify the parent
  };

  if (loading) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select a saved address:
        </label>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select a saved address:
        </label>
        <div className="text-center py-8 text-red-600">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 text-sm text-blue-600 hover:underline">
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select a saved address:
      </label>

      <div className="space-y-3">
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No saved addresses found.</p>
            <p className="text-gray-500 text-sm">Click "Add New Address" to get started.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id} // Use _id as the key
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddressId === address._id // Compare with _id
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
              onClick={() => handleSelectAddress(address._id)} // Pass _id to handler
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {address.label && ( 
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                        {address.label}
                      </span>
                    )}
                  </div>
                  {/* Assuming 'fullName' and 'phoneNumber' will be part of DeliveryAddress type
                      or you might need to combine fields from your API for these.
                      If not present, remove or adjust. */}
                  {/* <p className="font-medium text-gray-900">{address.fullName || "User Name"}</p>  */}
                  {/* <p className="text-sm text-gray-600">{address.phoneNumber || "N/A"}</p> */}
                  
                  {/* Use address_location_1 for street address and postal_code for zipCode */}
                  <p className="text-sm text-gray-600">
                    {address.house_no && `${address.house_no}, `}{address.address_location_1}, {address.city} - {address.postal_code}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onEdit(address._id); // Pass _id to onEdit
                  }}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={onAddNew}
        className="mt-4 flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Address
      </button>
    </div>
  );
};

export default AddressList;