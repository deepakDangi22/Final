import { Award, Users, Zap, Shield, Heart, Briefcase } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Raj Car Renter</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Your Trusted Partner in Premium Car Rentals Since 2015
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Raj Car Renter was founded in 2015 with a simple mission: to provide affordable luxury car rentals without compromising on quality or service. What started as a small fleet of 10 vehicles has grown into a trusted brand with over 250 premium cars across Mumbai and surrounding regions.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Over the years, we've served more than 5,000 happy customers who have trusted us for their car rental needs. Whether it's a quick city drive, a weekend getaway, or a special occasion, we're committed to providing exceptional vehicles and service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to 100% verified vehicles and transparent pricing has made us the go-to car rental service in the region. We believe in building long-term relationships with our customers based on trust and reliability.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571127230263-e46da62de99b?w=600&h=500&fit=crop&q=80"
                alt="Raj Car Renter Fleet"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide affordable, reliable, and premium car rental services that make luxury transportation accessible to everyone. We aim to deliver exceptional customer service with 100% verified vehicles and transparent, honest pricing every single time.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's most trusted car rental brand by expanding our fleet, enhancing our service quality, and building lasting relationships with our customers. We envision a future where premium car rentals are seamless, affordable, and accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Raj Car Renter?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Established */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2015</h3>
              <p className="text-gray-600">Year Established</p>
              <p className="text-sm text-gray-500 mt-2">
                Nearly a decade of reliable service
              </p>
            </div>

            {/* Fleet Size */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">250+</h3>
              <p className="text-gray-600">Premium Vehicles</p>
              <p className="text-sm text-gray-500 mt-2">
                Luxury and economy options available
              </p>
            </div>

            {/* Happy Customers */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600">Happy Customers</p>
              <p className="text-sm text-gray-500 mt-2">
                Trusted by thousands for their journeys
              </p>
            </div>

            {/* Verified Vehicles */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Verified Vehicles</p>
              <p className="text-sm text-gray-500 mt-2">
                All cars inspected and certified
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
              <p className="text-sm text-gray-500 mt-2">
                Always here to help you anytime
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">0%</h3>
              <p className="text-gray-600">Hidden Charges</p>
              <p className="text-sm text-gray-500 mt-2">
                Complete transparency in pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-300">
              These principles guide everything we do at Raj Car Renter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">🎯 Trust & Reliability</h3>
              <p className="text-gray-300">
                We believe in building long-term relationships with our customers based on honesty, reliability, and transparent practices. Your trust is our greatest asset.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">⭐ Quality Excellence</h3>
              <p className="text-gray-300">
                We maintain the highest standards for our vehicles and services. Every car is meticulously inspected and verified before reaching our customers.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">💰 Affordability</h3>
              <p className="text-gray-300">
                We believe premium doesn't have to be expensive. Our competitive pricing ensures you get the best value without compromising on quality.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">🤝 Customer First</h3>
              <p className="text-gray-300">
                Your satisfaction is our priority. We go the extra mile to ensure every interaction with Raj Car Renter exceeds your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Raj Car Renter Difference
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Join thousands of satisfied customers who trust us for their car rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-center"
            >
              Book Your Car
            </a>
            <a
              href="/cars"
              className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition text-center border border-white"
            >
              View Our Fleet
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+91-9999-999-999</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">info@rajcarrenter.com</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Mumbai, Maharashtra</p>
              <p className="text-sm text-gray-500">Head Office</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
