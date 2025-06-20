// AddressList.tsx
import React, { useState, useEffect } from "react";
import { Edit2, Plus } from "lucide-react";

import type { DeliveryAddress } from "../../../../types";
import axios from "axios";
import { getAuthToken } from "../../../auth/authService";
import { useNavigate } from "react-router-dom";

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
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialSelectedAddressId
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        if (!token) {
          setError("Authentication required to load addresses.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const response = await axios.get<DeliveryAddress[]>(
          "http://localhost:9000/address/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const addressList = response.data;
        console.log(response.data);

        const normalizedAddresses = addressList.map((addr) => ({
          ...addr,
          id: addr._id,
        }));

        setAddresses(normalizedAddresses);

        const addressIds = normalizedAddresses.map((addr) => addr._id);
        localStorage.setItem("addressIds", JSON.stringify(addressIds));

        const storedSelectedId = localStorage.getItem("selectedAddressId");

        if (
          storedSelectedId &&
          addressList.some((addr) => addr._id === storedSelectedId)
        ) {
          setSelectedAddressId(storedSelectedId);
          onSelect(storedSelectedId);
        } else if (!initialSelectedAddressId && addressList.length > 0) {
          const defaultId = addressList[0]._id;
          setSelectedAddressId(defaultId);
          localStorage.setItem("selectedAddressId", defaultId);
          onSelect(defaultId);
        } else if (
          initialSelectedAddressId &&
          !addressList.some((addr) => addr._id === initialSelectedAddressId)
        ) {
          if (addressList.length > 0) {
            const fallbackId = addressList[0]._id;
            setSelectedAddressId(fallbackId);
            localStorage.setItem("selectedAddressId", fallbackId);
            onSelect(fallbackId);
          } else {
            setSelectedAddressId(null);
            localStorage.removeItem("selectedAddressId");
            onSelect("");
          }
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to load addresses. Please try again.");
        setAddresses([]);
        setSelectedAddressId(null);
        localStorage.removeItem("selectedAddressId");
        onSelect("");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [initialSelectedAddressId, onSelect, navigate]);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    localStorage.setItem("selectedAddressId", addressId);
    onSelect(addressId);
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
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
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
            <p className="text-gray-500 text-sm">
              Click "Add New Address" to get started.
            </p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddressId === address._id
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
              onClick={() => handleSelectAddress(address._id)}
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
                  <p className="text-sm text-gray-600">
                    {address.house_no && `${address.house_no}, `}
                    {address.address_location_1}, {address.city} -{" "}
                    {address.postal_code}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address._id);
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
