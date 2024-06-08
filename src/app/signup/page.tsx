"use client";

import { CardComponent } from "@/components/Card";
import { SignupForm, SignupFormData } from "@/components/SignupForm";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utils/api";

export default function Page() {
  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await api.post("/auth/signup", data);
      if (response.status === 201) {
        Toast({
          variant: "default",
          title: "Success",
          description: "Account created successfully.",
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
    <div className="flex justify-center items-center my-auto dark:bg-[#09090B] px-3">
      <Toaster />
      <CardComponent
        title="Signup"
        description="Enter your name and email and password below to create to your account"
      >
        <SignupForm onSubmit={onSubmit} />
      </CardComponent>
    </div>
  );
}
