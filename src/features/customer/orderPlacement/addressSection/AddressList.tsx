// AddressList.tsx
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import type { DeliveryAddress } from "../../../../types";
import axios from "axios";
import { getAuthToken } from "../../../auth/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify

interface AddressListProps {
  initialSelectedAddressId?: string | null;
  onSelect: (addressId: string, addressDetails: DeliveryAddress) => void;
  onEdit: (addressDetails: DeliveryAddress) => void;
  onAddNew: () => void;
}

const AddressList = forwardRef<
  { fetchAddresses: () => void },
  AddressListProps
>(({ initialSelectedAddressId = null, onSelect, onEdit, onAddNew }, ref) => {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialSelectedAddressId
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required to load addresses.");
        toast.error("You need to be logged in to view addresses.");
        setLoading(false);
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

      const addressList = response.data.map((addr) => ({
        ...addr,
        id: addr._id,
      }));
      setAddresses(addressList);

      const storedSelectedId = localStorage.getItem("selectedAddressId");
      let initialSelectionMade = false;

      if (
        storedSelectedId &&
        addressList.some((addr) => addr.id === storedSelectedId)
      ) {
        setSelectedAddressId(storedSelectedId);
        onSelect(
          storedSelectedId,
          addressList.find((addr) => addr.id === storedSelectedId)!
        );
        initialSelectionMade = true;
      } else if (
        initialSelectedAddressId &&
        addressList.some((addr) => addr.id === initialSelectedAddressId)
      ) {
        setSelectedAddressId(initialSelectedAddressId);
        onSelect(
          initialSelectedAddressId,
          addressList.find((addr) => addr.id === initialSelectedAddressId)!
        );
        initialSelectionMade = true;
      } else if (addressList.length > 0) {
        const defaultId = addressList[0].id;
        setSelectedAddressId(defaultId);
        localStorage.setItem("selectedAddressId", defaultId!);
        onSelect(defaultId!, addressList[0]);
        initialSelectionMade = true;
      } else {
        setSelectedAddressId(null);
        localStorage.removeItem("selectedAddressId");
        onSelect("", {
          address_location_1: "",
          city: "",
          postal_code: 0,
          country: "",
        } as DeliveryAddress);
        initialSelectionMade = true;
      }

      if (!initialSelectionMade && addressList.length > 0) {
        const defaultId = addressList[0].id;
        setSelectedAddressId(defaultId);
        localStorage.setItem("selectedAddressId", defaultId!);
        onSelect(defaultId!, addressList[0]);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load addresses. Please try again.");
      toast.error("Failed to load addresses. Please try again.");
      setAddresses([]);
      setSelectedAddressId(null);
      localStorage.removeItem("selectedAddressId");
      onSelect("", {
        address_location_1: "",
        city: "",
        postal_code: 0,
        country: "",
      } as DeliveryAddress);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchAddresses,
  }));

  useEffect(() => {
    fetchAddresses();
  }, [initialSelectedAddressId, navigate]);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    localStorage.setItem("selectedAddressId", addressId);
    const selectedAddr = addresses.find((addr) => addr.id === addressId);
    if (selectedAddr) {
      onSelect(addressId, selectedAddr);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this address? This action cannot be undone."
      )
    ) {
      return;
    }

    const toastId = toast.info("Deleting address...", {
      autoClose: false,
      closeButton: false,
      isLoading: true,
    });

    setLoading(true);
    setError(null);

    try {
      // logic to delete the address
      const token = getAuthToken();
      if (!token) {
        toast.update(toastId, {
          render: "Authentication required to delete addresses.",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
        setLoading(false);
        return;
      }

      // api call to delete address
      await axios.delete(`http://localhost:9000/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //toast update
      toast.update(toastId, {
        render: "Address deleted successfully!",
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
      fetchAddresses();

      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
        localStorage.removeItem("selectedAddressId");
        onSelect("", {
          address_location_1: "",
          city: "",
          postal_code: 0,
          country: "",
        } as DeliveryAddress);
      }
    } catch (err) {
      console.error("Error deleting address:", err);
      toast.update(toastId, {
        render: "Failed to delete address. Please try again.",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
      setError("Failed to delete address. Please try again.");
    } finally {
      setLoading(false);
    }
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
            onClick={() => fetchAddresses()}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Retry
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
              key={address.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddressId === address.id
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
              }`}
              onClick={() => handleSelectAddress(address.id!)}
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
                    {address.address_location_1}
                    {address.address_location_2
                      ? `, ${address.address_location_2}`
                      : ""}
                    , {address.city} - {address.postal_code}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(address);
                    }}
                    className="text-gray-400 hover:text-orange-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id!);
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
});

export default AddressList;
