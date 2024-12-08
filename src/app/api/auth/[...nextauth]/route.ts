import NextAuth from "next-auth"; // Import NextAuth for authentication handling
import GitHubProvider from "next-auth/providers/github"; // Import GitHub provider for authentication
import { NextAuthOptions } from "next-auth"; // Import the types for NextAuth options

// Define the authentication options
export const authOptions: NextAuthOptions = {
  // Authentication providers array
  providers: [
    // GitHub authentication provider configuration
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, // GitHub Client ID from environment variables
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // GitHub Client Secret from environment variables
    }),
  ],

  // Secret used for JWT signing and encryption (keep it private)
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth

  // Callbacks to customize the session and JWT behavior
  callbacks: {
    // Callback function to modify session object after successful authentication
    async session({ session, token }) {
      // Add custom user information (e.g., user ID) to the session object
      if (session.user) {
        session.user.id = token.sub || ""; // Attach user ID from token or empty string if not available
      }
      return session; // Return the updated session
    },
  },
};

// Create and export the NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions); // Initialize NextAuth with the provided options
export { handler as GET, handler as POST }; // Export the handler for both GET and POST methods (Next.js API routes)
