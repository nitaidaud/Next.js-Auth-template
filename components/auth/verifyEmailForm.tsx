"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./cardWrapper";
import { FormSuccess } from "./formSuccess";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/newVerification";
import { LucideLoader } from "lucide-react";
import { FormError } from "./formError";

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!tokenId) {
      setError("Invalid token");
      return;
    }
    newVerification(tokenId)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.log(`error in verify email: ${error}`);

        setError("Failed to verify email");
      });
  }, [error, success, tokenId]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      title="Confirming now..."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <LucideLoader className="animate-spin" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmailForm;
