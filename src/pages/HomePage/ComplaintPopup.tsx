import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../features/auth/authService";


interface ComplaintPopupProps {
  restaurantId: string;
  orderId: string;
  onClose: () => void;
}
const accessToken = getAuthToken();
const ComplaintPopup: React.FC<ComplaintPopupProps> = ({
  restaurantId,
  orderId,
  onClose,
}) => {
  const [complaint, setComplaint] = useState("");
  const [managerId, setManagerId] = useState<string | null>(null);
  useEffect(() => {
    const fetchManagerId = async () => {
      try {
        console.log(restaurantId);
        console.log(orderId);
        console.log("jhgdcfuyehj", accessToken);
        const response = await axios.get<{ managerId: string }>(
          `http://localhost:3006/order/getManagerId/${restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);

        setManagerId(response.data.data.managerId);
        console.log("Manager ID:", response.data.data.managerId);
      } catch (error) {
        console.error("Error fetching manager ID:", error);
      }
    };

    fetchManagerId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:3005/complaints/${managerId}`,
        {
          orderId,
          complaint,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Thank you for your feedback.");
      setComplaint("");
      onClose();
    } catch (error) {
      console.error("Failed to submit complaint:", error);
      alert("Failed to submit complaint. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">
          Submit a Complaint
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your issue with the food delivery..."
            required
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPopup;

