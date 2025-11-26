import { useState } from "react";
import { CheckCircle } from "lucide-react";

const carOptions = [
  { id: 1, name: "BMW 5 Series - ₹8,000/day" },
  { id: 2, name: "Fortuner 4×4 - ₹5,000/day" },
  { id: 3, name: "Swift Dzire - ₹1,500/day" },
  { id: 4, name: "Audi A6 - ₹9,000/day" },
  { id: 5, name: "Hyundai Creta - ₹3,000/day" },
  { id: 6, name: "Maruti Ertiga - ₹2,000/day" },
  { id: 7, name: "Mercedes-Benz C-Class - ₹10,000/day" },
  { id: 8, name: "Toyota Innova - ₹4,000/day" },
];

const pickupLocations = [
  "Mumbai Airport",
  "Mumbai Central Railway Station",
  "Bandra",
  "Dadar",
  "Andheri",
  "Other",
];

export default function Booking() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    carSelected: "",
    pickupLocation: "",
    additionalNotes: "",
  });

  
  const [submitted, setSubmitted] = useState(false);
  const [submittedCar, setSubmittedCar] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.pickupDate ||
      !formData.returnDate ||
      !formData.carSelected ||
      !formData.pickupLocation
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const selectedCar =
      carOptions[parseInt(formData.carSelected) - 1]?.name || "";

    try {
      setSaving(true);
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          carName: selectedCar,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save booking");
      }

      setSubmittedCar(selectedCar);
      setSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        pickupDate: "",
        returnDate: "",
        carSelected: "",
        pickupLocation: "",
        additionalNotes: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong while saving your booking. Please try again.");
    } finally {
      setSaving(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Car
          </h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to reserve your preferred vehicle. Get
            instant confirmation!
          </p>
        </div>


        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Success Message */}

        {submitted && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-green-900 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-green-700">
                Your booking for{" "}
                <span className="font-bold">{submittedCar}</span> is confirmed!
                Raj Car Renter will contact you shortly at{" "}
                <span className="font-bold">{formData.phone}</span>.
              </p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                placeholder="John Doe"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                placeholder="+91-9999-999-999"
              />
            </div>

            {/* Car Selected */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Car *
              </label>
              <select
                name="carSelected"
                value={formData.carSelected}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              >
                <option value="">Choose a car...</option>
                {carOptions.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date *
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location *
              </label>
              <select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              >
                <option value="">Select location...</option>
                {pickupLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                placeholder="Any special requests or additional information..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition text-lg disabled:bg-red-400"
              >
                {saving ? "Saving..." : "Confirm Booking"}
              </button>
            </div>

            {/* Terms Note */}
            <p className="text-sm text-gray-600 text-center">
              By booking, you agree to our{" "}
              <a href="/terms" className="text-red-600 hover:underline">
                Terms & Conditions
              </a>
              . We'll contact you to confirm your reservation.
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm">
              Call us at <span className="font-bold">+91-9999-999-999</span>
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Instant Confirmation</h3>
            <p className="text-gray-600 text-sm">
              Get instant confirmation and booking details via SMS
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Booking</h3>
            <p className="text-gray-600 text-sm">
              100% secure and transparent with no hidden charges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
