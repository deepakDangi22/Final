import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    category: "exterior",
    title: "BMW 5 Series - Luxury Sedan",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 2,
    category: "exterior",
    title: "Audi A6 - Sleek Design",
    image:
      "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 3,
    category: "exterior",
    title: "Mercedes-Benz C-Class",
    image:
      "https://images.unsplash.com/photo-1618843479302-1bada2e4538f?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 4,
    category: "exterior",
    title: "Fortuner 4x4 - Premium SUV",
    image:
      "https://images.unsplash.com/photo-1617654112368-307921291f50?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 5,
    category: "interior",
    title: "Luxury Interior - Premium Seating",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 6,
    category: "interior",
    title: "Modern Dashboard & Controls",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 7,
    category: "interior",
    title: "Spacious Cabin Comfort",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 8,
    category: "interior",
    title: "Advanced Technology Interior",
    image:
      "https://images.unsplash.com/photo-1609432573888-2c4f1b50a44f?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 9,
    category: "delivery",
    title: "Professional Fleet Ready",
    image:
      "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 10,
    category: "delivery",
    title: "Vehicle Delivery Service",
    image:
      "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 11,
    category: "delivery",
    title: "Premium Handover Process",
    image:
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 12,
    category: "delivery",
    title: "Customer Satisfaction Guarantee",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 13,
    category: "handover",
    title: "Happy Customer Moment",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 14,
    category: "handover",
    title: "Customer with Keys",
    image:
      "https://images.unsplash.com/photo-1552821554-5fefe8c9ef14?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 15,
    category: "handover",
    title: "Successful Rental Experience",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=500&fit=crop&q=80",
  },
  {
    id: 16,
    category: "handover",
    title: "Showroom Professional Service",
    image:
      "https://images.unsplash.com/photo-1571127230263-e46da62de99b?w=500&h=500&fit=crop&q=80",
  },
];

const categories = [
  { id: "all", label: "All Photos" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "delivery", label: "Delivery" },
  { id: "handover", label: "Customer Handover" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-gray-600 text-lg">
            Browse our collection of premium vehicles and satisfied customer moments
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Image Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold">{filteredImages.length}</span> photos
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                    {image.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No images found for this category.
            </p>
          </div>
        )}

        {/* Category Descriptions */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Gallery Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Exterior */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Exterior Showcase
              </h3>
              <p className="text-gray-600 mb-4">
                View the stunning exterior design of our premium fleet. From sleek
                luxury sedans to powerful SUVs, each vehicle is meticulously
                maintained and ready for your journey.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ BMW 5 Series - Premium Sedan</li>
                <li>✓ Audi A6 - Elegant Design</li>
                <li>✓ Mercedes-Benz C-Class - Luxury</li>
                <li>✓ Fortuner 4x4 - Premium SUV</li>
              </ul>
            </div>

            {/* Interior */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">🪑</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Interior Comfort
              </h3>
              <p className="text-gray-600 mb-4">
                Experience the luxury and comfort of our vehicle interiors. Premium
                seating, advanced technology, and spacious cabins ensure your
                comfort during every journey.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Premium Leather Seating</li>
                <li>✓ Advanced Climate Control</li>
                <li>✓ Modern Dashboard Technology</li>
                <li>✓ Spacious Cabin Design</li>
              </ul>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Delivery Process
              </h3>
              <p className="text-gray-600 mb-4">
                Our professional delivery service ensures your vehicle arrives in
                perfect condition. Every car is inspected and prepared with care
                before handover.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Professional Vehicle Inspection</li>
                <li>✓ Safe Transportation</li>
                <li>✓ On-Time Delivery Guarantee</li>
                <li>✓ Ready for Your Journey</li>
              </ul>
            </div>

            {/* Customer Handover */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Customer Handover
              </h3>
              <p className="text-gray-600 mb-4">
                See our happy customers enjoying their rental experience. From
                business trips to weekend getaways, we make every journey memorable.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Satisfied Customer Stories</li>
                <li>✓ Memorable Travel Moments</li>
                <li>✓ Professional Support</li>
                <li>✓ 100% Customer Satisfaction</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-red-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="mb-6 text-lg">
            Choose from our premium collection and start your journey today
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Book Your Car Now
          </a>
        </section>
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600">
                {selectedImage.category === "exterior" &&
                  "Exterior view of our premium vehicles"}
                {selectedImage.category === "interior" &&
                  "Interior comfort and luxury experience"}
                {selectedImage.category === "delivery" &&
                  "Professional delivery and preparation service"}
                {selectedImage.category === "handover" &&
                  "Customer satisfaction and memorable moments"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
