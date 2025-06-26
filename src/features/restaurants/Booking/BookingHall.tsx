import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SignatureCanvas from "react-signature-canvas";
import toast, { Toaster } from "react-hot-toast";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingPDF from "./BookingPDF";

type FormData = {
  dateRange: [Date, Date] | null;
  eventType: string;
  guests: number;
  description: string;
  otherInfo: string;
  signature: string;
};

const BookingHall: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      dateRange: null,
      eventType: "",
      guests: 1,
      description: "",
      otherInfo: "",
      signature: "",
    },
  });

  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [pdfData, setPdfData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    if (!data.signature) {
      toast.error("Please provide your signature");
      return;
    }
    toast.success("Booking confirmed!");
    setPdfData(data);

    console.log("Booking Data:", data);
  };

  const clearSignature = () => {
    signaturePadRef.current?.clear();
    setValue("signature", "");
  };

  const handleReset = () => {
    setTimeout(() => {
      reset();
      signaturePadRef.current?.clear();
      setPdfData(null);
    }, 4000);
  };
  const saveSignature = () => {
    if (signaturePadRef.current?.isEmpty()) {
      setValue("signature", "");
    } else {
      const sigData = signaturePadRef.current?.toDataURL();
      setValue("signature", sigData || "");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Book Restaurant Hall
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Select Date or Date Range
          </label>
          <Controller
            control={control}
            name="dateRange"
            rules={{ required: "Please select date or date range" }}
            render={({ field }) => (
              <Calendar
                onChange={(value) => field.onChange(value)}
                selectRange
                value={field.value}
                minDate={new Date()}
                className="border rounded"
              />
            )}
          />
          {errors.dateRange && (
            <p className="text-red-600 text-sm mt-1">
              {errors.dateRange.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Event Type
          </label>
          <select
            {...register("eventType", { required: "Event type is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-orange-500"
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Event Type --
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Other">Other</option>
          </select>
          {errors.eventType && (
            <p className="text-red-600 text-sm mt-1">
              {errors.eventType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Number of Guests (Approximate)
          </label>
          <input
            {...register("guests", {
              required: "Number of guests is required",
              min: { value: 1, message: "At least 1 guest required" },
              max: { value: 1000, message: "Max 1000 guests allowed" },
            })}
            type="number"
            min={1}
            max={1000}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-orange-500"
          />
          {errors.guests && (
            <p className="text-red-600 text-sm mt-1">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description / Additional Details
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Describe your function or any special requests"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-orange-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Signature
          </label>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              className:
                "border border-gray-300 rounded w-full h-40 cursor-crosshair",
            }}
            ref={signaturePadRef}
            onEnd={saveSignature}
          />
          <div className="mt-2 flex gap-4">
            <button
              type="button"
              onClick={clearSignature}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Clear
            </button>
          </div>
          {errors.signature && (
            <p className="text-red-600 text-sm mt-1">
              {errors.signature.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-64 h-12 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
          >
            Book Now
          </button>
        </div>
      </form>

      {pdfData && (
        <div className="mt-6 flex justify-center">
          <PDFDownloadLink
            document={<BookingPDF data={pdfData} />}
            fileName="booking-confirmation.pdf"
            className="w-64 h-12 flex items-center justify-center bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
            onClick={handleReset}
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "Download Confirmation Receipt"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default BookingHall;
