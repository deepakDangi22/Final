import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Raj Car Renter</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for premium car rental and sales service. We provide affordable luxury vehicles for rent, purchase, and test drive.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition"
                title="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-red-600 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="hover:text-red-600 transition"
                >
                  Car Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-red-600 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-red-600 transition"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-600 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/booking"
                  className="hover:text-red-600 transition"
                >
                  Car Rental
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="hover:text-red-600 transition"
                >
                  Car Purchase
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  Test Drive
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  Insurance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <span>
                  123 Car Street, Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-red-600 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-red-600 transition"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-red-600 flex-shrink-0" />
                <a
                  href="mailto:info@rajcarrenter.com"
                  className="hover:text-red-600 transition"
                >
                  info@rajcarrenter.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-lg mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-red-100 text-sm">
                Get the latest offers and updates delivered to your inbox
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg text-gray-900 flex-1 md:flex-none focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm">
              &copy; {currentYear} Raj Car Renter. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/terms"
                className="hover:text-red-600 transition"
              >
                Terms & Conditions
              </Link>
              <a href="#" className="hover:text-red-600 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-600 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
