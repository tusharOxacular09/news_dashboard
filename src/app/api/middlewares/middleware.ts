import { withAuth } from "next-auth/middleware";

/**
 * Redirect to login page if not authenticated
 */
export default withAuth({
  pages: {
    signIn: "/",
  },
});

/**
 * Protected Routes
 */
export const config = {
  matcher: ["/newsnexus/:path*"],
};
