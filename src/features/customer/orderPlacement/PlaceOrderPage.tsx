// PlaceOrderPage.tsx
import React, { useState, useCallback, useRef } from "react";
import OrderConfirmation from "./orderConfirmation/OrderConfirmation";
import AddressSection from "./addressSection/AddressSection";
import PaymentSection from "./paymentSection/PaymentSection";
import OrderSummary from "./orderSummary/OrderSummary";
import type { DeliveryAddress, PaymentMethod } from "../../../types/index";
import Navbar from "../../../components/layout/Navbar";
import { toast } from 'react-toastify';

interface OrderData {
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
}

const PlaceOrderPage: React.FC = () => {
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState<DeliveryAddress | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [editingAddressData, setEditingAddressData] = useState<DeliveryAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const addressListRef = useRef<{ fetchAddresses: () => void }>(null);

  const handleAddressSelection = useCallback((selectedId: string, addressDetails: DeliveryAddress) => {
    setCurrentDeliveryAddress(addressDetails);
    setShowAddressForm(false);
    setIsEditingAddress(false);
    setEditingAddressData(null);
  }, []);

  const handleAddNewAddress = useCallback(() => {
    setShowAddressForm(true);
    setIsEditingAddress(false);
    setEditingAddressData({
      address_location_1: "",
      city: "",
      postal_code: 0,
      country: "",
      label: "Other",
      house_no: "",
      address_location_2: "",
    });
  }, []);

  const handleEditAddress = useCallback((addressDetails: DeliveryAddress) => {
    setShowAddressForm(true);
    setIsEditingAddress(true);
    setEditingAddressData(addressDetails);
  }, []);

  const handleAddressFormSaveSuccess = useCallback(() => {
    setShowAddressForm(false);
    setIsEditingAddress(false);
    setEditingAddressData(null);
    if (addressListRef.current) {
      addressListRef.current.fetchAddresses();
    }
  }, []);

  const handleCancelAddressForm = useCallback(() => {
    setShowAddressForm(false);
    setIsEditingAddress(false);
    setEditingAddressData(null);
  }, []);

  const handlePlaceOrder = () => {
    if (
      !currentDeliveryAddress ||
      !currentDeliveryAddress.address_location_1 ||
      !currentDeliveryAddress.postal_code ||
      !currentDeliveryAddress.city ||
      !currentDeliveryAddress.country
    ) {
      toast.error("Please select or enter a complete delivery address.");
      return;
    }

    const order: OrderData = {
      deliveryAddress: currentDeliveryAddress,
      paymentMethod,
      // Add actual cart items, total amount, etc. here based on your app's state
    };

    setOrderData(order);
    setOrderPlaced(true);
  };

  const resetOrder = useCallback(() => {
    setOrderPlaced(false);
    setOrderData(null);
    setCurrentDeliveryAddress(null);
    setShowAddressForm(false);
    setIsEditingAddress(false);
    setEditingAddressData(null);
    setPaymentMethod("cashOnDelivery");
    if (addressListRef.current) {
      addressListRef.current.fetchAddresses();
    }
  }, []);

  if (orderPlaced && orderData && orderData.paymentMethod === "cashOnDelivery") {
    return <OrderConfirmation orderData={orderData} onReset={resetOrder} />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
            <p className="text-gray-600">Complete your delivery details and payment information</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AddressSection
                ref={addressListRef}
                initialSelectedAddressId={currentDeliveryAddress?.id || null}
                showAddressForm={showAddressForm}
                isEditingAddress={isEditingAddress}
                deliveryAddress={editingAddressData || {
                  address_location_1: "",
                  city: "",
                  postal_code: 0,
                  country: "",
                  label: "Other",
                  house_no: "",
                  address_location_2: "",
                }}
                onAddressSelection={handleAddressSelection}
                onAddNewAddress={handleAddNewAddress}
                onEditAddress={handleEditAddress}
                onSaveAddress={handleAddressFormSaveSuccess}
                onInputChange={(field, value) => {
                  setEditingAddressData(prev => ({
                    ...prev!,
                    [field]: value
                  }));
                }}
                onCancelForm={handleCancelAddressForm}
              />

              <PaymentSection
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                deliveryAddress={currentDeliveryAddress}
                modeOfPayment={paymentMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;