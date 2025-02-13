import { prisma } from "@/prisma/prisma";

export const getVerificationTokenByEmail = (email: string) => {
  try {
    const verificationToken = prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};

export const getVerificationTokenByID = (id: string) => {
  try {
    const verificationToken = prisma.verificationToken.findFirst({
      where: {
        id,
      },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};
