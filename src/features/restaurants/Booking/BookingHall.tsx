import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SignatureCanvas from "react-signature-canvas";
import toast, { Toaster } from "react-hot-toast";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import BookingPDF from "./BookingPDF";
import Qr from "./Qr";

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
  const [cloudPdfUrl, setCloudPdfUrl] = useState<string>("");

  const generatePdfBlob = async (data: FormData) => {
    const doc = <BookingPDF data={data} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    return blob;
  };

  const uploadToCloudinary = async (pdfBlob: Blob) => {
    const url = `https://api.cloudinary.com/v1_1/deyny0llk/raw/upload`;
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", "unsigned_booking");
    formData.append("resource_type", "raw");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload to Cloudinary");
    }
    console.log(response);

    const data = await response.json();
    console.log(data.secure_url);

    return data.secure_url;
  };

  const onSubmit = async (data: FormData) => {
    if (!data.signature) {
      toast.error("Please provide your signature");
      return;
    }
    toast.loading("Uploading PDF...");
    try {
      const blob = await generatePdfBlob(data);
      const uploadedUrl = await uploadToCloudinary(blob);
      setCloudPdfUrl(uploadedUrl);
      toast.success("Booking confirmed and PDF uploaded!");
      setPdfData(data);
    } catch (error) {
      toast.error("Failed to upload PDF. Please try again.");
      console.error(error);
    } finally {
      toast.dismiss();
    }
  };

  const clearSignature = () => {
    signaturePadRef.current?.clear();
    setValue("signature", "");
  };

  const saveSignature = () => {
    if (signaturePadRef.current?.isEmpty()) {
      setValue("signature", "");
    } else {
      const sigData = signaturePadRef.current?.toDataURL();
      setValue("signature", sigData || "");
    }
  };

  const handleReset = () => {
    reset();
    signaturePadRef.current?.clear();
    setPdfData(null);
    setCloudPdfUrl("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Book Restaurant Hall
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="flex justify-center mb-1  font-medium text-gray-700">
            Select Date or Date Range
          </label>
          <div className="flex justify-center items-start gap-30">
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
          </div>
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
            Number of Guests (Approx)
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
      <div className="">{cloudPdfUrl ? <Qr url={cloudPdfUrl} /> : <></>}</div>
      {pdfData && (
        <div className="mt-6 flex justify-center gap-4">
          <PDFDownloadLink
            document={<BookingPDF data={pdfData} />}
            fileName="booking-confirmation.pdf"
            className="w-64 h-12 flex items-center justify-center bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "Download Confirmation Receipt"
            }
          </PDFDownloadLink>

          <button
            onClick={handleReset}
            className="w-32 h-12 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            Reset Form
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingHall;
