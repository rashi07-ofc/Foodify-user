// AddressSection.tsx
import { MapPin } from "lucide-react";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import type { DeliveryAddress } from "../../../../types/index";

interface AddressSectionProps {
  savedAddresses: DeliveryAddress[];
  selectedAddressId: string;
  showAddressForm: boolean;
  isEditingAddress: boolean;
  deliveryAddress: DeliveryAddress;
  onAddressSelection: (addressId: string) => void;
  onAddNewAddress: () => void;
  onEditAddress: (addressId: string) => void;
  onSaveAddress: () => void;
  onInputChange: (field: keyof DeliveryAddress, value: string) => void;
  onCancelForm: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  savedAddresses,
  selectedAddressId,
  showAddressForm,
  isEditingAddress,
  deliveryAddress,
  onAddressSelection,
  onAddNewAddress,
  onEditAddress,
  onSaveAddress,
  onInputChange,
  onCancelForm,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MapPin className="w-6 h-6 text-orange-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
      </div>

      {savedAddresses.length > 0 && !showAddressForm ? (
        <AddressList 
          addresses={savedAddresses}
          selectedAddressId={selectedAddressId}
          onSelect={onAddressSelection}
          onEdit={onEditAddress}
          onAddNew={onAddNewAddress}
        />
      ) : (
        <AddressForm
          address={deliveryAddress}
          isEditing={isEditingAddress}
          onInputChange={onInputChange}
          onSave={onSaveAddress}
          onCancel={onCancelForm}
        />
      )}
    </div>
  );
};

export default AddressSection;