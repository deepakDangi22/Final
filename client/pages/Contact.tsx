import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Get in touch with Raj Car Renter. We're here to help with any
            questions or inquiries.
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Phone */}
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl mb-3 flex justify-center">📞</div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-red-600 font-bold text-lg mb-1">
                7988138110
              </p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl mb-3 flex justify-center">💬</div>
              <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-green-600 font-bold text-lg mb-1">
                +91-7988-138-110
              </p>
              <p className="text-sm text-gray-600">Quick response</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl mb-3 flex justify-center">📧</div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 font-bold text-sm mb-1 break-all">
                info@rajcarrenter.com
              </p>
              <p className="text-sm text-gray-600">Within 24 hours</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl mb-3 flex justify-center">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Office</h3>
              <p className="text-sm text-gray-700 font-medium mb-1">
                Mumbai, India
              </p>
              <p className="text-sm text-gray-600">Head Office</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-green-900 mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll get back to you shortly
                      at {formData.email}.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
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
                    placeholder="+91-XXXX-XXXX-XXX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  >
                    <option value="">Select a subject...</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="pricing">Pricing Question</option>
                    <option value="support">Customer Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition text-lg"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-600 text-center">
                  We'll respond to your inquiry as soon as possible.
                </p>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Office Details */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Location
                </h2>

                {/* Address Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex gap-4 mb-6">
                    <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        Head Office
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-red-50 rounded-lg border border-red-200 p-6 mb-6">
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">
                        Business Hours
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>
                          <span className="font-medium">Monday - Friday:</span>{" "}
                          9:00 AM - 8:00 PM
                        </li>
                        <li>
                          <span className="font-medium">Saturday:</span> 10:00 AM
                          - 6:00 PM
                        </li>
                        <li>
                          <span className="font-medium">Sunday:</span> 10:00 AM -
                          5:00 PM
                        </li>
                        <li className="pt-2 border-t border-red-200">
                          <span className="font-medium">24/7 Support:</span>{" "}
                          Available for emergencies
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Quick Contact Options
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:7988138110"
                      className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium transition"
                    >
                      <Phone className="w-5 h-5" />
                      Call: 7988138110
                    </a>
                    <a
                      href="https://wa.me/917988138110"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-green-600 hover:text-green-700 font-medium transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Chat
                    </a>
                    <a
                      href="mailto:info@rajcarrenter.com"
                      className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium transition"
                    >
                      <Mail className="w-5 h-5" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                How quickly can I book a car?
              </h3>
              <p className="text-gray-600">
                You can book a car instantly through our website. Just fill out
                the booking form and get immediate confirmation!
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                What documents do I need?
              </h3>
              <p className="text-gray-600">
                You'll need a valid driving license and an ID proof. We can
                help guide you through the requirements when you contact us.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                Do you offer delivery service?
              </h3>
              <p className="text-gray-600">
                Yes! We provide professional delivery and pickup services for
                your convenience. Contact us for details.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                What's your cancellation policy?
              </h3>
              <p className="text-gray-600">
                Free cancellation up to 24 hours before pickup. Please check our
                terms for detailed cancellation policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-lg mb-8 text-gray-100">
            Contact us today or book your car instantly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Book Now
            </a>
            <a
              href="tel:7988138110"
              className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition border border-white"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
