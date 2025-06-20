// AddressSection.tsx
import { MapPin } from "lucide-react";
import AddressList from "./AddressList"; // AddressList now fetches its own data
import AddressForm from "./AddressForm";
import type { DeliveryAddress } from "../../../../types/index";

interface AddressSectionProps {
  // `savedAddresses` prop is removed as AddressList will fetch its own
  initialSelectedAddressId: string | null; // Pass this to AddressList
  showAddressForm: boolean;
  isEditingAddress: boolean;
  deliveryAddress: DeliveryAddress; // For the form
  onAddressSelection: (addressId: string) => void;
  onAddNewAddress: () => void;
  onEditAddress: (addressId: string) => void;
  onSaveAddress: () => void;
  onInputChange: (field: keyof DeliveryAddress, value: string) => void;
  onCancelForm: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  initialSelectedAddressId, // Now receiving this
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

      
      {!showAddressForm ? ( // If not showing the form, display the AddressList
        <AddressList 
          initialSelectedAddressId={initialSelectedAddressId} // Pass the initial selection to AddressList
          onSelect={onAddressSelection}
          onEdit={onEditAddress}
          onAddNew={onAddNewAddress} // This button will still be in AddressList
        />
      ) : ( // Otherwise, display the AddressForm
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