import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zm-2-5a.75.75 0 100-1.5.75.75 0 000 1.5zM5 12a2 2 0 11-4 0 2 2 0 014 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

        {description && (
          <p className="text-gray-600 mb-8">{description}</p>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-blue-800">
            💡 This page is coming soon! Let us know if you'd like this page to
            be filled in by continuing the conversation.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
