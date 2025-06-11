import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// Define available and unavailable time slots
const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
];
const unavailableSlots = ["12:30 PM"];

const BookTable: React.FC = () => {
  const [date, setDate] = useState("");
  const [members, setMembers] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    if (!date || !selectedSlot) {
      toast.error("Please select both date and time slot");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        `Booking confirmed for ${members} people on ${date} at ${selectedSlot}`
      );
    }, 1200);
  };

  // Restrict to today or future dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 bg-white rounded-lg shadow-lg">
      {/* This renders the toast notifications */}
      <Toaster />

      {/* Form Section */}
      <motion.div
        className="space-y-6 w-full lg:max-w-md"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-red-600">Reserve Your Table</h2>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-red-500"
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={members}
            onChange={(e) =>
              setMembers(Math.max(1, Math.min(20, Number(e.target.value))))
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-red-500"
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time Slot
          </label>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => {
              const isUnavailable = unavailableSlots.includes(slot);
              return (
                <motion.button
                  key={slot}
                  onClick={() => !isUnavailable && setSelectedSlot(slot)}
                  disabled={isUnavailable}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md text-sm border transition-all duration-300 ${
                    selectedSlot === slot
                      ? "bg-red-600 text-white"
                      : isUnavailable
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {slot}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Booking..." : "Book Now"}
        </motion.button>
      </motion.div>

      {/* Image Section (visible only on large screens) */}
      <motion.div
        className="flex-1 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://www.hotelierindia.com/cloud/2021/11/22/DTOm7Duo-shutterstock_1278665539_3.jpg"
          alt="Table Booking"
          className="rounded-lg shadow-lg object-cover w-full h-full max-h-[400px]"
        />
      </motion.div>
    </div>
  );
};

export default BookTable;
