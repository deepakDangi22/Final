import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="bg-red-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center font-bold">
              R
            </div>
            <span className="text-gray-900">Raj Car Renter</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              About Us
            </Link>
            <Link
              to="/cars"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Car Listings
            </Link>
            <Link
              to="/gallery"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Gallery
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-600 font-medium transition"
            >
              Contact
            </Link>
            <Link
              to="/booking"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/cars"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Car Listings
            </Link>
            <Link
              to="/gallery"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/testimonials"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-red-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/booking"
              className="block mt-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition z-40"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.738L.929 23.5l8.272-2.737a9.857 9.857 0 004.573 1.162h.004c5.44 0 9.885-4.467 9.948-9.773.054-2.611-.997-5.071-2.926-6.930-.444-.435-.995-.67-1.625-.67 1.627-.033 3.203.591 4.382 1.75.596.584.851 1.333.851 2.132 0 1.341-.523 2.587-1.457 3.528-.477.466-.982.685-1.623.685z" />
        </svg>
      </a>
    </header>
  );
}
