"use server";
import { getUserByResetPasswordToken } from "@/data/user";
import { sendResetSuccessfulEmail } from "@/lib/mail";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export const resetPassword = async (password: string, token: string) => {
  try {
    const user = await getUserByResetPasswordToken(token);
    if (!user) {
      return { error: "Invalid or expired token" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        ...user,
      },
      data: {
        password: hashedPassword,
        resetPasswordExpiresAt: null,
        resetPasswordToken: null,
      },
    });
    await sendResetSuccessfulEmail(user.email);
    return { success: "Password reset successfully" };
  } catch (error) {
    console.log(`error reset password: ${error}`);

    return { error: "Error resetting password" };
  }
};
