import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="text-center max-w-md px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </p>
          <p className="text-gray-600 mb-6">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track!
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-blue-800">
            💡 If you think this is an error, please visit our home page or
            contact us at{" "}
            <a
              href="mailto:info@rajcarrenter.com"
              className="font-semibold text-blue-600 hover:underline"
            >
              info@rajcarrenter.com
            </a>
          </p>
        </div>

        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-bold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
