import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./prisma/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);

        if (!validatedData.success) return null;

        const { email, password } = validatedData.data;

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user || !user.email || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;
