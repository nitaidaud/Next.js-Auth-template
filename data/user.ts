import { prisma } from "@/prisma/prisma";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return { success: "User created successfully" };
  } catch (error) {
    console.error(`error create user: ${error}`);
    return { error: "Error creating user" };
  }
};

export const getUserByID = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: lowerCaseEmail },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByResetPasswordToken = async (
  resetPasswordToken: string,
) => {
  try {
    const nowDate = new Date(Date.now());
    const user = await prisma.user.findFirst({
      where: { resetPasswordToken, resetPasswordExpiresAt: { gt: nowDate } },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
