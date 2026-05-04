import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "~/server/db";

const handler = NextAuth({
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      name: "Demo Login",
      credentials: {},
      async authorize() {
        // demo user
        return {
          id: "demo-user",
          name: "Demo User",
          email: "demo@agriexchange.local",
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "database",
  },
});

export { handler as GET, handler as POST };