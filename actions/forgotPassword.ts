"use server";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { prisma } from "@/prisma/prisma";
import * as bcrypt from "bcryptjs";

export const forgotPassword = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) return { error: "User not found" };

    const resetPasswordToken = await bcrypt.genSalt();
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    await prisma.user.update({
      where: {
        ...user,
      },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpiresAt: new Date(resetPasswordExpiresAt),
      },
    });

    await sendPasswordResetEmail(email, resetPasswordToken);

    return { success: "Password reset email sent" };
  } catch (error) {
    console.error(`error sending password reset email: ${error}`);
    return { error: "Internal Server Error" };
  }
};
