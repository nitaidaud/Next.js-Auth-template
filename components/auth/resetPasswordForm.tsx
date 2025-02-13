"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./cardWrapper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";
import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword } from "@/actions/resetPassword";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      try {
        if (!token) {
          throw new Error("Token is required");
        }
        const result = await resetPassword(data.password, token);

        if (result.error) {
          setError(result.error);
        }

        if (result.success) {
          setSuccess(result.success);
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong!");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset Password"
      title="Reset password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login page"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Reset"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
