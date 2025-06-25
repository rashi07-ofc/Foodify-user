import { forwardRef, useImperativeHandle, useRef } from "react"; // Import forwardRef and useImperativeHandle
import { MapPin } from "lucide-react";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import type { DeliveryAddress } from "../../../../types/index";

interface AddressSectionProps {
  initialSelectedAddressId: string | null;
  showAddressForm: boolean;
  isEditingAddress: boolean;
  deliveryAddress: DeliveryAddress; // For the form (data to pre-fill)
  onAddressSelection: (addressId: string, addressDetails: DeliveryAddress) => void; // Updated signature
  onAddNewAddress: () => void;
  onEditAddress: (addressDetails: DeliveryAddress) => void; // Updated signature
  onSaveAddress: () => void; // This is actually `onSaveSuccess` from the form's perspective
  onInputChange: (field: keyof DeliveryAddress, value: string | number) => void; // Updated type
  onCancelForm: () => void;
}

// Use forwardRef to allow PlaceOrderPage to get a ref to AddressList
const AddressSection = forwardRef<
  { fetchAddresses: () => void },
  AddressSectionProps
>(
  (
    {
      initialSelectedAddressId,
      showAddressForm,
      isEditingAddress,
      deliveryAddress,
      onAddressSelection,
      onAddNewAddress,
      onEditAddress,
      onSaveAddress,
      onInputChange,
      onCancelForm,
    },
    ref
  ) => {
    // A ref to the AddressList component to call its fetchAddresses method
    const addressListInternalRef = useRef<{ fetchAddresses: () => void }>(null);

    // Expose fetchAddresses from AddressList through this component's ref
    useImperativeHandle(ref, () => ({
      fetchAddresses: () => {
        if (addressListInternalRef.current) {
          addressListInternalRef.current.fetchAddresses();
        }
      },
    }));

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <MapPin className="w-6 h-6 text-orange-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
        </div>

        {!showAddressForm ? (
          <AddressList
            ref={addressListInternalRef} // Pass the internal ref to AddressList
            initialSelectedAddressId={initialSelectedAddressId}
            onSelect={onAddressSelection}
            onEdit={onEditAddress}
            onAddNew={onAddNewAddress}
          />
        ) : (
          <AddressForm
            address={deliveryAddress}
            isEditing={isEditingAddress}
            onInputChange={onInputChange}
            onSaveSuccess={onSaveAddress} // Pass onSaveAddress as onSaveSuccess
            onCancel={onCancelForm}
          />
        )}
      </div>
    );
  }
);

export default AddressSection;