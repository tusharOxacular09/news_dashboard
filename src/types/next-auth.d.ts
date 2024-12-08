import NextAuth, { DefaultSession } from "next-auth";

/**
 * Declaring Next Auth Types
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
