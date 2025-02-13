"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const googleAuthenticate = async () => {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "google log in failed";
    }
    throw error;
  }
};
