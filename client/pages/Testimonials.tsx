import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    city: "Mumbai",
    rating: 5,
    text: "Excellent service! The BMW was in perfect condition and the entire booking process was seamless. Raj Car Renter exceeded my expectations. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Priya Singh",
    city: "Bangalore",
    rating: 5,
    text: "I rented a Fortuner for a family trip and couldn't have asked for better service. The car was clean, comfortable, and the support team was incredibly responsive.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Amit Patel",
    city: "Pune",
    rating: 4,
    text: "Great experience with Raj Car Renter! The Audi A6 was fantastic for my business trip. Only minor issue was the pickup timing, but the team made up for it with excellent service.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Neha Sharma",
    city: "Delhi",
    rating: 5,
    text: "Outstanding! I booked a Mercedes-Benz C-Class for my wedding and it was perfect. The car looked stunning and the entire experience was hassle-free. Thank you!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Vikram Desai",
    city: "Ahmedabad",
    rating: 5,
    text: "Affordable luxury! The Swift Dzire was perfect for my daily commute needs. Transparent pricing with no hidden charges. Will definitely book again!",
    image:
      "https://images.unsplash.com/photo-1507009596176-b9a50499f238?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "Anjali Gupta",
    city: "Pune",
    rating: 5,
    text: "Amazing service and professional team! The Hyundai Creta was in excellent condition. 24/7 customer support is a huge plus. Highly trustworthy company!",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Testimonials
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Read what our satisfied customers have to say about their experience
            with Raj Car Renter
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">5000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">
              Authentic reviews from our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6 border border-gray-100"
              >
                {/* Rating Stars */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review Text */}
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Trust Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Customers Trust Raj Car Renter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                100% Verified Vehicles
              </h3>
              <p className="text-gray-600">
                Every car in our fleet is thoroughly inspected and verified to
                ensure the highest quality and safety standards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                No hidden charges, no surprises. Our pricing is upfront and
                competitive, ensuring you get the best value.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our dedicated support team is available round the clock to assist
                you with any questions or concerns.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Service
              </h3>
              <p className="text-gray-600">
                From booking to return, we ensure every step of your rental
                experience is smooth and professional.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Fleet
              </h3>
              <p className="text-gray-600">
                Choose from luxury sedans to comfortable SUVs. We have the
                perfect vehicle for every need and budget.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Since 2015
              </h3>
              <p className="text-gray-600">
                With nearly a decade of experience, we've built a reputation for
                reliability and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Customer Satisfaction
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {[
              { stars: 5, percentage: 85, count: 4250 },
              { stars: 4, percentage: 10, count: 500 },
              { stars: 3, percentage: 3, count: 150 },
              { stars: 2, percentage: 1, count: 50 },
              { stars: 1, percentage: 1, count: 50 },
            ].map((rating) => (
              <div key={rating.stars} className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium text-gray-700 w-20">
                    {rating.stars} Star{rating.stars > 1 ? "s" : ""}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-16">
                    {rating.percentage}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-24">
                  {rating.count} customers
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Happy Customers Today
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Experience the Raj Car Renter difference for yourself
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Book Your Car Now
          </a>
        </div>
      </section>
    </div>
  );
}
