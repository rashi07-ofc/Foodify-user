import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintPopup from "./ComplaintPopup";
import { getAuthToken } from "../../features/auth/authService";

interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid";
  paymentMethod: "cash_on_delivery" | "card" | "upi";
  totalAmount: number;
  items: object[];
}

const YourOrder: React.FC = () => {
  const accessToken = getAuthToken();
  const [orders, setOrders] = useState<Order[]>([]);
  const [popupData, setPopupData] = useState<{
    restaurantId: string;
    orderId: string;
  } | null>(null);

  
  const getInvoice = async (orderId: string) => {
    try {
      
      const res = await axios.get(
        `http://localhost:3006/order/generateInvoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob",
        }
      );


      
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to get invoice:", error);
      alert("Unable to download invoice.");
    }
  };


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ data: Order[] }>(
          "http://localhost:3006/order/userAllOrder",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [accessToken]);

  return (
    
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-4 p-4 border-l-4 border-orange-500 bg-orange-50 rounded shadow-sm"
          >
            <div className="mb-2 text-sm text-gray-500">
              Order ID:
              <span className="font-medium text-gray-700">{order._id}</span>
            </div>

            <div className="mb-1">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className="text-orange-600 capitalize">{order.status}</span>
            </div>

            <div className="mb-1">
              <span className="font-semibold text-gray-700">Payment:</span>
              {order.paymentMethod.replace(/_/g, " ")}
              <span className="text-sm text-orange-500">
                ({order.paymentStatus})
              </span>
            </div>

            <div className="mb-1">
              <span className="font-semibold text-gray-700">Total Amount:</span>
              ₹{order.total}
            </div>

            <div className="mb-1">
              <button
                onClick={() =>
                  setPopupData({
                    restaurantId: order.restaurantId,
                    orderId: order._id,
                  })
                }
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Feedback
              </button>
               <button
                onClick={() => getInvoice(order._id)}
                className="px-4 py-2 mx-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Get Invoice
              </button>

              {popupData && popupData.orderId === order._id && (
                <ComplaintPopup
                  restaurantId={popupData.restaurantId}
                  orderId={popupData.orderId}
                  onClose={() => setPopupData(null)}
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourOrder;
