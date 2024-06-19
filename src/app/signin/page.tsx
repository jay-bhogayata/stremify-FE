"use client";

import { CardComponent } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { SigninForm, SigninFormData } from "@/components/SigninForm";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
        router.push("/profile");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      Toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
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
    </>
  );
}
