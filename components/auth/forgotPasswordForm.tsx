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
import { ForgotPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPassword } from "@/actions/forgotPassword";

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      try {
        const result = await forgotPassword(data.email);

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
      headerLabel="Forgot Password"
      title="Forgot password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login page"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
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
            {isPending ? "Loading..." : "Send"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
