import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  transmission: string;
  fuelType: string;
  seats: number;
}

export default function CarListings() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cars");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const sortedCars = [...cars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Listings</h1>
          <p className="text-gray-600 text-lg">
            Browse our extensive collection of premium vehicles
          </p>
        </div>

        {/* Sorting */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold">{sortedCars.length}</span> cars
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin mr-2" size={32} />
            <span className="text-gray-600">Loading cars...</span>
          </div>
        ) : sortedCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No cars found. Please check back later!
            </p>
          </div>
        ) : (
          /* Cars Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedCars.map((car) => (
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
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Seats:</span>
                      <span className="font-medium text-gray-900">
                        {car.seats}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <span className="text-red-600 font-bold text-lg">
                      ₹{car.pricePerDay.toLocaleString()}/day
                    </span>
                    <Link
                      to={`/car/${car._id}`}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm font-medium"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
