import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Loader,
  AlertCircle,
  Check,
  X,
  Image,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
  _id: string;
  fullName: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  carSelected: string;
  carName: string;
  pickupLocation: string;
  additionalNotes?: string;
  createdAt?: string;
}

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  image: string;
  transmission: string;
  fuelType: string;
  seats: number;
  available: boolean;
}

interface FormData {
  name: string;
  price: number;
  pricePerDay: number;
  image: string;
  images: string[];
  transmission: string;
  fuelType: string;
  seats: number;
  luggage: string;
  mileage: string;
  engine: string;
  year: number;
  color: string;
  description: string;
  features: string;
  amenities: string;
  insurance: string;
  fuelPolicy: string;
  available: boolean;
  gallery: string;
  rating: number;
  reviews: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    pricePerDay: 0,
    image: "",
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    luggage: "500 L",
    mileage: "15 km/l",
    engine: "2.0L",
    year: 2024,
    color: "Black",
    description: "",
    features: "",
    amenities: "",
    insurance: "Full Coverage Included",
    fuelPolicy: "Full Tank Required",
    available: true,
    gallery: "",
    rating: 4.5,
    reviews: 0,
  });

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }

    fetchCars();
  }, [navigate]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        title: "Error",
        description: "Failed to fetch cars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast({
        title: "Not authorized",
        description: "Please log in again as admin.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingImage(true);
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));

      toast({
        title: "Image uploaded",
        description: "Main image uploaded successfully.",
      });
    } catch (error) {
      console.error("Image upload error:", error);
      toast({
        title: "Upload failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const carData = {
      ...formData,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      amenities: formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      gallery: formData.gallery
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    };

    try {
      setLoading(true);
      const url = editingId ? `/api/cars/${editingId}` : "/api/cars";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Failed to save car",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Car ${editingId ? "updated" : "created"} successfully`,
      });

      resetForm();
      fetchCars();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car: Car & FormData) => {
    setFormData({
      ...car,
      features: car.features.join(", "),
      amenities: car.amenities.join(", "),
      gallery: car.gallery.join(", "),
    });
    setEditingId(car._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      toast({
        title: "Success",
        description: "Car deleted successfully",
      });

      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
      toast({
        title: "Error",
        description: "Failed to delete car",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      pricePerDay: 0,
      image: "",
      transmission: "Manual",
      fuelType: "Petrol",
      seats: 5,
      luggage: "500 L",
      mileage: "15 km/l",
      engine: "2.0L",
      year: 2024,
      color: "Black",
      description: "",
      features: "",
      amenities: "",
      insurance: "Full Coverage Included",
      fuelPolicy: "Full Tank Required",
      available: true,
      gallery: "",
      rating: 4.5,
      reviews: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {admin.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Car Button */}
        <div className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
            >
              <Plus size={20} />
              Add New Car
            </button>
          ) : null}
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Car" : "Add New Car"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <input
                  type="text"
                  placeholder="Car Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />

                <input
                  type="number"
                  placeholder="Price (Monthly)"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value),
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />

                <input
                  type="number"
                  placeholder="Price Per Day"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricePerDay: parseInt(e.target.value),
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={uploadingImage}
                />
                {formData.image && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected image: {formData.image}
                  </p>
                )}

                <select
                  value={formData.transmission}
                  onChange={(e) =>
                    setFormData({ ...formData, transmission: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>

                <select
                  value={formData.fuelType}
                  onChange={(e) =>
                    setFormData({ ...formData, fuelType: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>

                <input
                  type="number"
                  placeholder="Seats"
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seats: parseInt(e.target.value),
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />

                <input
                  type="text"
                  placeholder="Luggage Capacity"
                  value={formData.luggage}
                  onChange={(e) =>
                    setFormData({ ...formData, luggage: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />

                <input
                  type="text"
                  placeholder="Mileage"
                  value={formData.mileage}
                  onChange={(e) =>
                    setFormData({ ...formData, mileage: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />

                <input
                  type="text"
                  placeholder="Engine"
                  value={formData.engine}
                  onChange={(e) =>
                    setFormData({ ...formData, engine: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />

                <input
                  type="number"
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />

                <input
                  type="text"
                  placeholder="Color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />

              {/* Arrays as comma-separated values */}
              <textarea
                placeholder="Features (comma-separated)"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />

              <textarea
                placeholder="Amenities (comma-separated)"
                value={formData.amenities}
                onChange={(e) =>
                  setFormData({ ...formData, amenities: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />

              <textarea
                placeholder="Gallery URLs (comma-separated)"
                value={formData.gallery}
                onChange={(e) =>
                  setFormData({ ...formData, gallery: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium disabled:bg-red-400"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Save Car
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Cars ({cars.length})
            </h2>
          </div>

          {loading && !showForm ? (
            <div className="p-8 text-center">
              <Loader className="animate-spin mx-auto mb-4" size={40} />
              <p className="text-gray-600">Loading cars...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="mx-auto mb-4 text-gray-400" size={40} />
              <p className="text-gray-600">No cars added yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Car Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Price/Day
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Transmission
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Fuel Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr
                      key={car._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          {car.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{car.pricePerDay}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {car.transmission}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {car.fuelType}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {car.available ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                            Unavailable
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleEdit(car as Car & FormData)
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
