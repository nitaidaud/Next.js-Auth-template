"use server"
import { Resend } from "resend";

const domain = process.env.DOMAIN;

export const sendVerificationEmail = async (email: string, tokenId: string) => {
  try {
    const confirmationLink = `${domain}/verify-email?token=${tokenId}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "verify your email",
      html: `<p>Click <a href=${confirmationLink}>here</a> to verify your email`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
) => {
  try {
    const resetPasswordLink = `${domain}/auth/reset-password?token=${resetToken}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "reset your password",
      html: `<p>Click <a href=${resetPasswordLink}>here</a> to reset your password`,
    });
    return { success: "Email send successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Email sending failed!" };
  }
};

export const sendResetSuccessfulEmail = async (email: string) => {
  try {
    const dashboardLink = `${domain}/dashboard`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password reset was successful",
      html: `<p>Click <a href=${dashboardLink}>here</a> to go to your dashboard`,
    });
  } catch (error) {
    console.error(error);
  }
};
