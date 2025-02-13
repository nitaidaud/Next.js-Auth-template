import { prisma } from "@/prisma/prisma";

export const getAccountByUserID = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    console.log(`error in get account: ${error}`);
    return null;
  }
};
