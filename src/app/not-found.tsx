import Link from "next/link";

/**
 * NotFound Component
 * ------------------
 * This component renders a custom 404 "Page Not Found" error page.
 * It provides a user-friendly message and a button to redirect users
 * back to the Dashboard page.
 */

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-darkBackground">
      {/* 404 Error Title */}
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404
      </h1>

      {/* Friendly message for the user */}
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Redirect button to the Dashboard */}
      <Link href="/newsnexus/dashboard">
        <button className="px-6 py-3 text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 rounded-lg shadow">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}
