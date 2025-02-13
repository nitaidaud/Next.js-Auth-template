"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByID } from "@/data/verficationToken";
import { prisma } from "@/prisma/prisma";

export const newVerification = async (tokenId: string) => {
  const token = await getVerificationTokenByID(tokenId);

  if (!token) {
    return { error: "Invalid token" };
  }

  const tokenHasExpired = new Date(token.expires) < new Date();

  if (tokenHasExpired) {
    return { error: "Token has expired" };
  }

  const user = await getUserByEmail(token.email);
  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
      email: token.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: tokenId,
    },
  });
  return { success: "Email verified" };
};
