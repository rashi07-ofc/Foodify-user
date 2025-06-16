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

      {/* The logic here needs to be slightly adjusted.
        AddressList will now manage its own `addresses` state.
        The `AddressSection` parent component will likely need to know
        if there are *any* addresses fetched by AddressList to decide 
        whether to initially show the list or the form if no addresses exist.

        However, based on the current `showAddressForm` prop,
        we'll assume the parent `PlaceOrderPage` or similar is controlling this.
        
        If `showAddressForm` is false, it means we should show the list.
        If `showAddressForm` is true, it means we should show the form.
      */}
      
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