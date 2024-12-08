"use client";
import { useSession } from "next-auth/react"; // Importing useSession hook to get session details
import { useRouter } from "next/navigation"; // Importing useRouter to navigate to other pages
import { useEffect } from "react"; // Importing useEffect to handle side effects like redirection
import Loader from "@/components/global/Loader"; // Assuming a Loader component for loading state

// Define ProtectedRoute component that wraps protected content
const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode; // This ensures the children prop is required and can accept React elements
}>) => {
  const { data: session, status } = useSession(); // Destructure session and status from useSession hook
  const router = useRouter(); // Initialize useRouter hook to manage navigation

  // useEffect to handle the redirection when there is no session
  useEffect(() => {
    // If session is still loading, do nothing
    if (status === "loading") {
      return; // Skip logic until the session is fully loaded
    }

    // If session does not exist (user is not authenticated), redirect to login page
    if (!session) {
      router.push("/"); // Redirect to the login page if no valid session
    }
  }, [session, status, router]); // Re-run the effect when session, status, or router changes

  // Show a loading state while the session is loading
  if (status === "loading") {
    return <Loader />; // Render a loading component if session data is still being fetched
  }

  // If no session exists, show a redirect message and initiate the redirect
  if (!session) {
    return <div>Redirecting...</div>; // Display a message while the redirect is happening
  }

  // If session exists, render the protected content (children)
  return <>{children}</>; // Render the protected route's children (protected content) if the user is authenticated
};

export default ProtectedRoute;
