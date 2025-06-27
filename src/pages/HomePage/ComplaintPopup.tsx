import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthToken } from "../../features/auth/authService";

interface Props {
  orderId: string;
  onClose: () => void;
}

const ComplaintPopup: React.FC<Props> = ({ orderId, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const accessToken=getAuthToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(orderId);
    console.log(complaint);

    if (!orderId || !feedback.trim()) {
      toast.error("Order ID and feedback are required.");
      return;
    }

    if (customerName.length < 3 || customerName.length > 50) {
      toast.error("Customer name must be 3-50 characters.");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    if (feedback.length < 10 || feedback.length > 300) {
      toast.error("Feedback must be 10–300 characters.");
      return;
    }

    const payload = {
      orderId,
      description: feedback,
      status: "pending",
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:9000/complain", payload,{
headers: {
              Authorization: `Bearer ${accessToken}`,
            },
      });
      toast.success("Feedback submitted!");
      onClose();
    } catch (err) {
      toast.error("Submission failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Order ID
            </label>
            <input
              type="text"
              value={orderId}
              disabled
              className="w-full border rounded-md bg-gray-100 p-2 text-sm text-gray-700"
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-md p-2 text-sm"
              required
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Rating
            </label>
            <div className="flex space-x-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Feedback
            </label>
            <textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded-md p-2 text-sm h-28 resize-none"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPopup;
