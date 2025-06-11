// AddressList.tsx
import { Edit2, Plus } from "lucide-react";
import type { DeliveryAddress } from "../../../../types";

interface AddressListProps {
  addresses: DeliveryAddress[];
  selectedAddressId: string;
  onSelect: (addressId: string) => void;
  onEdit: (addressId: string) => void;
  onAddNew: () => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onAddNew,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select a saved address:
      </label>

      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedAddressId === address.id
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
            }`}
            onClick={() => onSelect(address.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    {address.label}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.phoneNumber}</p>
                <p className="text-sm text-gray-600">
                  {address.streetAddress}, {address.city} - {address.zipCode}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(address.id);
                }}
                className="text-gray-400 hover:text-orange-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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