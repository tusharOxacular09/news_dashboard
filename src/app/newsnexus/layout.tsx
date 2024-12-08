import { Header } from "@/components/global/Header";
import ProtectedRoute from "../route/ProtectedRoute";

/**
 * NewsNexusRootLayout Component
 * -----------------------------
 * This layout component wraps the application's main content with a consistent header and layout structure.
 *
 * Props:
 * - `children` (React.ReactNode): The child components to be rendered within the layout.
 *
 * Usage:
 * - Use this layout as the root wrapper for pages in the NewsNexus application to maintain a unified structure.
 */

export default function NewsNexusRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <>
        {/* Header Section */}
        {/* The Header component is rendered at the top of the layout. It typically contains the logo, navigation, and theme toggle. */}
        <Header />

        {/* Main Content Section */}
        {/* Render the child components passed into the layout. */}
        {children}
      </>
    </ProtectedRoute>
  );
}
