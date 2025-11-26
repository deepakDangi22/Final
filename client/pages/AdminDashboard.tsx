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
  Menu,
  ChevronRight,
  Mail,
  Car,
  Calendar,
  Users,
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

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

interface CarData {
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

type TabType = "cars" | "bookings" | "subscribers";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cars, setCars] = useState<CarData[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("cars");
  const [uploadingImages, setUploadingImages] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    pricePerDay: 0,
    image: "",
    images: [],
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
    fetchBookings();
    fetchSubscribers();
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

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter/subscribers");
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch subscribers",
        variant: "destructive",
      });
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

  const handleMultipleImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

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
      setUploadingImages(true);
      const formDataUpload = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataUpload.append("images", files[i]);
      }

      const response = await fetch("/api/admin/upload-multiple", {
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
        images: [...prev.images, ...data.urls],
      }));

      toast({
        title: "Images uploaded",
        description: `${data.urls.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      console.error("Images upload error:", error);
      toast({
        title: "Upload failed",
        description: "Could not upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
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
      images: formData.images,
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

  const handleEdit = (car: CarData & FormData) => {
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
      images: [],
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

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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

  const menuItems = [
    { id: "cars", label: "Cars Management", icon: Car, count: cars.length },
    { id: "bookings", label: "Booking Enquiries", icon: Calendar, count: bookings.length },
    { id: "subscribers", label: "Newsletter Subscribers", icon: Mail, count: subscribers.length },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 fixed h-full z-40`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-xl font-bold">Raj Admin</h2>
              <p className="text-xs text-gray-400">Car Management</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
            title="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              title={item.label}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.count} items</div>
                </div>
              )}
              {sidebarOpen && activeTab === item.id && (
                <ChevronRight size={16} />
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition font-medium"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-30">
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome, {admin.username}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Current Page</p>
              <p className="text-lg font-bold text-gray-900">
                {menuItems.find((m) => m.id === activeTab)?.label}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Cars Tab */}
          {activeTab === "cars" && (
            <div>
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

              {showForm && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {editingId ? "Edit Car" : "Add New Car"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          Main image: {formData.image}
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Image className="inline mr-2" size={16} />
                        Upload Additional Car Images (Multiple)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMultipleImagesUpload}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        disabled={uploadingImages}
                      />
                      {uploadingImages && (
                        <p className="text-xs text-gray-500 mt-1">Uploading...</p>
                      )}
                    </div>

                    {formData.images.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Uploaded Images ({formData.images.length})
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((img, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={img}
                                alt={`Car ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                title="Remove image"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                                    handleEdit(car as CarData & FormData)
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
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Booking Enquiries ({bookings.length})
                </h2>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="mx-auto mb-4 text-gray-400" size={40} />
                  <p className="text-gray-600">No booking enquiries yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Car Selected
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Pickup Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Return Date
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Pickup Location
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {booking.fullName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.phone}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {booking.carName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(booking.pickupDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.pickupLocation}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {booking.additionalNotes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === "subscribers" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Newsletter Subscribers ({subscribers.length})
                </h2>
              </div>

              {subscribers.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="mx-auto mb-4 text-gray-400" size={40} />
                  <p className="text-gray-600">No newsletter subscribers yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Subscribed Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr
                          key={subscriber._id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(subscriber.subscribedAt).toLocaleDateString()} at{" "}
                            {new Date(subscriber.subscribedAt).toLocaleTimeString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
