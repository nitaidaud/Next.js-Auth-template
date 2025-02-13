"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.parse(data);

  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  const { email, password } = validatedData;

  const userExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!userExist || !userExist.password || !userExist.email) {
    return { error: "User not found" };
  }

  try {
    await signIn("credentials", {
      email: userExist.email,
      password: password,
      redirect: false, // Change this to false to handle redirect manually
    });

    return { success: "user logged successfully", redirectTo: "/dashboard" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please confirm your email address" };
      }
    }

    return { error: "Something went wrong!" };
  }
};
