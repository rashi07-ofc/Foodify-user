import { useState, useEffect } from "react";
import { orderHistory as mockOrderData } from "./mockOrderHistory";

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  orderId: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
};

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOrderHistory(mockOrderData);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        Error loading order history: {error}
      </div>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <div className="text-gray-600 text-center mt-8">No past orders yet.</div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Past Orders
        </h2>
        <ul className="space-y-4">
          {orderHistory.map((order) => (
            <li
              key={order.orderId}
              className="bg-white rounded-md shadow-md p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-sm text-gray-500">Order ID:</span>
                  <p className="font-semibold text-gray-700">{order.orderId}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Order Date:</span>
                  <p className="text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Total:</span>
                  <p className="font-semibold text-green-600">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Status:</span>
                  <p
                    className={`text-sm font-medium ${
                      order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "Cancelled"
                        ? "text-red-500"
                        : "text-yellow-500" // Assuming other statuses are pending/processing
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(order)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-sm"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>

        {selectedOrder && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
            {/* Blurry backdrop */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"
              onClick={handleCloseDetails}
            ></div>

            <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Order Details
                </h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder.orderId}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Items:
              </h4>
              <ul className="space-y-2 mb-4">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item.name}{" "}
                    <span className="text-sm text-gray-500">
                      x {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 font-semibold mb-4">
                Total Amount:{" "}
                <span className="text-green-600">
                  ₹{selectedOrder.totalAmount.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-600">
                Status:{" "}
                <span
                  className={`font-medium ${
                    selectedOrder.status === "Delivered"
                      ? "text-green-500"
                      : selectedOrder.status === "Cancelled"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
