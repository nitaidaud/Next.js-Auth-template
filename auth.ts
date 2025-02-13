import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma/prisma";
import authConfig from "./auth.config";
import { getUserByID } from "./data/user";
import { getAccountByUserID } from "./data/account";

const adapter = PrismaAdapter(prisma);

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter,
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserByID(user.id ?? "");
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserByID(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserID(existingUser.id);

      token.isOauth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOath: token.isOauth,
          name: token.name,
        },
      };
    },
  },
});
