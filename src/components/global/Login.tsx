"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Loader from "./Loader";

/**
 * Login Component
 */
export default function Login() {
  const { data: session, status } = useSession(); // Using status to track loading state
  const [error, setError] = useState<string | null>(null); // Error state for login issues

  // Handle login errors
  const handleSignIn = async () => {
    setError(null); // Clear any previous errors
    const result = await signIn("github", { redirect: false });
    if (result?.error) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="bg-white max-sm:mx-3 dark:bg-[#1a2023] shadow-xl rounded-lg w-full max-w-sm p-6 text-center flex flex-col items-center justify-center">
      {/* App Logo */}
      <div className="mb-8">
        <img
          src="/assets/logo.svg"
          alt="App Logo"
          className="w-14 h-14 object-contain"
        />
      </div>

      {!session ? (
        <>
          {/* Welcome Message */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Welcome to NewsNexus!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stay updated with the latest news at your fingertips.
          </p>

          {/* Error Message (if any) */}
          {error && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleSignIn}
            disabled={status === "loading"} // Disable the button while loading
            className={`flex items-center justify-center w-full bg-black text-white py-2 rounded-lg hover:bg-darkBackground transition duration-200 ${
              status === "loading" ? "cursor-not-allowed" : ""
            }`}
          >
            {status === "loading" ? (
              <Loader />
            ) : (
              <span className="mr-2">Login with GitHub</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </button>
        </>
      ) : (
        <>
          {/* Welcome User */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Welcome, {session.user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Email: {session.user?.email}
          </p>

          {/* Go to Dashboard Button */}
          <Link
            href={"/newsnexus/dashboard"}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Go to Dashboard
          </Link>
        </>
      )}

      {/* Footer Message */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {session
          ? "Thanks for signing in. Enjoy exploring NewsNexus!"
          : "Login to explore the world of NewsNexus. Discover the latest news tailored for you."}
      </div>
    </div>
  );
}
