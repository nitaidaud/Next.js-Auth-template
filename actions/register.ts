"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { createUser, getUserByEmail } from "@/data/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerCaseEmail = email.toLowerCase();

    const userExist = await getUserByEmail(lowerCaseEmail);
    console.log("user:", userExist);
    
    if (userExist) {
      return { error: "User already in use" };
    }

    await createUser(name, lowerCaseEmail, hashedPassword);

    //Generate a verification token
    const verificationToken = await generateVerificationToken(lowerCaseEmail);

    await sendVerificationEmail(email, verificationToken.id);

    return { success: "Email verification was sent!" };
  } catch (error) {
    console.log(`error create user: ${error}`);

    return { error: "An error occurred while creating the user" };
  }
};
