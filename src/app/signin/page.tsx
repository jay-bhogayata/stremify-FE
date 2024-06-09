"use client";

import { CardComponent } from "@/components/Card";
import { SigninForm, SigninFormData } from "@/components/SigninForm";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utils/api";
import Link from "next/link";

export default function Page() {
  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        Toast({
          variant: "default",
          title: "Success",
          description:
            "Logged in successfully. Redirecting you to the dashboard.",
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      Toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center my-auto  px-3">
      <Toaster />
      <CardComponent
        title="Signin"
        description="Enter your email below to login to your account"
      >
        <SigninForm onSubmit={onSubmit} />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardComponent>
    </div>
  );
}
