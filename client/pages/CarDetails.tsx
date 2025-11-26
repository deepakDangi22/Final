import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Zap,
  Fuel,
  Gauge,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Loader,
} from "lucide-react";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCar(data);
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the car you're looking for.
          </p>
          <Link
            to="/cars"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Back to Car Listings
          </Link>
        </div>
      </div>
    );
  }

  // Use uploaded images if available, otherwise fall back to gallery URLs
  const imageGallery = (car.images && car.images.length > 0) ? car.images : car.gallery || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageGallery.length) % imageGallery.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mb-8 transition"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6">
              {/* Main Image */}
              <div className="relative h-96 md:h-[500px] bg-gray-200 overflow-hidden">
                {imageGallery.length > 0 ? (
                  <img
                    src={imageGallery[currentImageIndex]}
                    alt={`${car.name} view ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                    No images available
                  </div>
                )}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {car.gallery.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 p-4 bg-gray-100 overflow-x-auto">
                {car.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex
                        ? "border-red-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {car.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(car.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        {car.rating} ({car.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl font-bold text-red-600">
                    ₹{car.pricePerDay}
                  </div>
                  <p className="text-gray-600">per day</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-red-600" />
                  <span className="font-semibold text-gray-900">Seats</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{car.seats}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Fuel size={20} className="text-red-600" />
                  <span className="font-semibold text-gray-900">Mileage</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{car.mileage}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-red-600" />
                  <span className="font-semibold text-gray-900">Luggage</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{car.luggage}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge size={20} className="text-red-600" />
                  <span className="font-semibold text-gray-900">
                    Transmission
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {car.transmission}
                </p>
              </div>
            </div>

            {/* Detailed Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Technical Details
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Engine</dt>
                      <dd className="font-medium text-gray-900">{car.engine}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Fuel Type</dt>
                      <dd className="font-medium text-gray-900">
                        {car.fuelType}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Transmission</dt>
                      <dd className="font-medium text-gray-900">
                        {car.transmission}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Year</dt>
                      <dd className="font-medium text-gray-900">{car.year}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Color</dt>
                      <dd className="font-medium text-gray-900">{car.color}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Rental Details
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Insurance</dt>
                      <dd className="font-medium text-gray-900">
                        {car.insurance}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Fuel Policy</dt>
                      <dd className="font-medium text-gray-900">
                        {car.fuelPolicy}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Daily Rate</dt>
                      <dd className="font-medium text-red-600">
                        ₹{car.pricePerDay}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Monthly Rate</dt>
                      <dd className="font-medium text-gray-900">
                        ₹{(car.pricePerDay * 25).toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book This Car
              </h2>

              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Price per day</p>
                <p className="text-3xl font-bold text-red-600 mb-1">
                  ₹{car.pricePerDay}
                </p>
                <p className="text-gray-600 text-sm">+ taxes & additional fees</p>
              </div>

              <Link
                to="/booking"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition mb-3 block text-center"
              >
                Book Now
              </Link>

              <button className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition">
                Add to Wishlist
              </button>

              <div className="mt-6 space-y-4 border-t pt-6">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Comprehensive Insurance
                    </h3>
                    <p className="text-sm text-gray-600">
                      Full coverage included for peace of mind
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      24/7 Support
                    </h3>
                    <p className="text-sm text-gray-600">
                      Round-the-clock customer assistance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Multiple Pickup Locations
                    </h3>
                    <p className="text-sm text-gray-600">
                      Convenient booking across the city
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-3">
                {car.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={18} className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              {car.features.length > 5 && (
                <button className="text-red-600 font-semibold mt-4 hover:text-red-700 transition">
                  View all features (+{car.features.length - 5})
                </button>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-red-600" />
                  <a href="tel:+919876543210" className="text-gray-700 hover:text-red-600 transition">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-red-600" />
                  <a href="mailto:info@rajcarrenter.com" className="text-gray-700 hover:text-red-600 transition">
                    info@rajcarrenter.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Amenities Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              All Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
