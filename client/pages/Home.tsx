import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Star, Loader } from "lucide-react";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  transmission: string;
  fuelType: string;
  rating: number;
  reviews: number;
}

const features = [
  {
    icon: "💰",
    title: "Lowest Prices Guaranteed",
    description: "Best rental rates in the market",
  },
  {
    icon: "🕐",
    title: "24/7 Customer Support",
    description: "Always available to help you",
  },
  {
    icon: "✅",
    title: "Premium & Verified Cars",
    description: "Only high-quality, verified vehicles",
  },
  {
    icon: "🔒",
    title: "No Hidden Charges",
    description: "Transparent pricing, no surprises",
  },
];

export default function Home() {
  const [topCars, setTopCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cars");
        if (response.ok) {
          const data = await response.json();
          setTopCars(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&h=800&fit=crop&q=80')",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Car Showroom & Rental Service
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Affordable luxury cars for rent, purchase & test drive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cars"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-center"
            >
              View Cars
            </Link>
            <Link
              to="/booking"
              className="bg-red-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-900 transition text-center border border-white"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Cars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from our premium collection of vehicles
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin mr-2" size={32} />
              <span className="text-gray-600">Loading cars...</span>
            </div>
          ) : topCars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No cars available at the moment. Please check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topCars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {car.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Transmission:</span>
                        <span className="font-medium text-gray-900">
                          {car.transmission}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Fuel Type:</span>
                        <span className="font-medium text-gray-900">
                          {car.fuelType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(car.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-gray-600 ml-1 text-xs">
                          ({car.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <span className="text-red-600 font-bold text-lg">
                        ₹{car.pricePerDay.toLocaleString()}
                      </span>
                      <Link
                        to={`/car/${car._id}`}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/cars"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Raj Car Renter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Wide Selection",
                description:
                  "Choose from our diverse fleet of premium and economy vehicles",
              },
              {
                title: "Affordable Rates",
                description:
                  "Competitive pricing with transparent and no hidden charges",
              },
              {
                title: "Easy Booking",
                description: "Simple online booking process in just a few clicks",
              },
              {
                title: "Professional Service",
                description:
                  "Friendly and professional staff to assist you anytime",
              },
              {
                title: "Insurance Covered",
                description:
                  "All vehicles come with comprehensive insurance coverage",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer support for your peace of mind",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-start gap-4">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Rent Your Dream Car?</h2>
          <p className="text-lg mb-8 text-red-100">
            Browse our collection and book your perfect vehicle today
          </p>
          <Link
            to="/cars"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Explore Cars
          </Link>
        </div>
      </section>
    </div>
  );
}
