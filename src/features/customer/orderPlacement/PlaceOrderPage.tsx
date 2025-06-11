// PlaceOrderPage.tsx
import React, { useState, useEffect } from "react";
import OrderConfirmation from "./orderConfirmation/OrderConfirmation";
import AddressSection from "./addressSection/AddressSection";
import PaymentSection from "./paymentSection/PaymentSection";
import OrderSummary from "./orderSummary/OrderSummary";
import type { DeliveryAddress, OrderData, PaymentMethod } from "../../../types/index";

const PlaceOrderPage: React.FC = () => {
  // State declarations
  const [savedAddresses, setSavedAddresses] = useState<DeliveryAddress[]>([
    {
      id: "1",
      fullName: "John Doe",
      phoneNumber: "+1234567890",
      streetAddress: "123 Main Street, Apt 4B",
      city: "New York",
      zipCode: "10001",
      label: "Home",
    },
    {
      id: "2",
      fullName: "John Doe",
      phoneNumber: "+1234567890",
      streetAddress: "456 Business Ave, Suite 200",
      city: "New York",
      zipCode: "10002",
      label: "Office",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    id: "",
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    label: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mock");
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Check if user has saved addresses on component mount
  useEffect(() => {
    if (savedAddresses.length === 0) {
      setShowAddressForm(true);
    }
  }, [savedAddresses.length]);

  // Handler functions
  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = savedAddresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
    }
    setShowAddressForm(false);
    setIsEditingAddress(false);
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
    setIsEditingAddress(false);
    setSelectedAddressId("");
    setDeliveryAddress({
      id: "",
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      label: "",
    });
  };

  const handleEditAddress = (addressId: string) => {
    const addressToEdit = savedAddresses.find((addr) => addr.id === addressId);
    if (addressToEdit) {
      setDeliveryAddress(addressToEdit);
      setEditingAddressId(addressId);
      setIsEditingAddress(true);
      setShowAddressForm(true);
      setSelectedAddressId("");
    }
  };

  const handleSaveAddress = () => {
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.phoneNumber ||
      !deliveryAddress.streetAddress ||
      !deliveryAddress.city ||
      !deliveryAddress.zipCode
    ) {
      alert("Please fill in all address fields");
      return;
    }

    if (isEditingAddress && editingAddressId) {
      // Update existing address
      setSavedAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddressId
            ? { ...deliveryAddress, id: editingAddressId }
            : addr
        )
      );
      setIsEditingAddress(false);
      setEditingAddressId("");
    } else {
      // Add new address
      const newAddress = {
        ...deliveryAddress,
        id: Date.now().toString(),
        label: deliveryAddress.label || "Other",
      };
      setSavedAddresses((prev) => [...prev, newAddress]);
      setDeliveryAddress(newAddress);
    }

    setShowAddressForm(false);
  };

  const handlePlaceOrder = () => {
    // Check if address is selected or filled
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.phoneNumber ||
      !deliveryAddress.streetAddress ||
      !deliveryAddress.city ||
      !deliveryAddress.zipCode
    ) {
      alert("Please select or enter a delivery address");
      return;
    }

    const order: OrderData = {
      deliveryAddress,
      paymentMethod,
    };

    setOrderData(order);
    setOrderPlaced(true);
  };

  const resetOrder = () => {
    setOrderPlaced(false);
    setOrderData(null);
    setSelectedAddressId("");
    setShowAddressForm(savedAddresses.length === 0);
    setIsEditingAddress(false);
    setEditingAddressId("");
    setDeliveryAddress({
      id: "",
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      label: "",
    });
    setPaymentMethod("mock");
  };

  if (orderPlaced && orderData && orderData.paymentMethod === "cod") {
    return <OrderConfirmation orderData={orderData} onReset={resetOrder} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
          <p className="text-gray-600">Complete your delivery details and payment information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AddressSection 
              savedAddresses={savedAddresses}
              selectedAddressId={selectedAddressId}
              showAddressForm={showAddressForm}
              isEditingAddress={isEditingAddress}
              deliveryAddress={deliveryAddress}
              onAddressSelection={handleAddressSelection}
              onAddNewAddress={handleAddNewAddress}
              onEditAddress={handleEditAddress}
              onSaveAddress={handleSaveAddress}
              onInputChange={handleInputChange}
              onCancelForm={() => setShowAddressForm(false)}
            />
            
            <PaymentSection 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              deliveryAddress={deliveryAddress}
              paymentMethod={paymentMethod}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;