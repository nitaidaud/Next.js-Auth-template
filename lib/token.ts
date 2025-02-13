import { getVerificationTokenByEmail } from "@/data/verficationToken";
import { prisma } from "@/prisma/prisma";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  //Generate a random token
  const token = uuid();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; //1 hour

  //Check if a token already exists for the user
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  //Create new verification token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};
