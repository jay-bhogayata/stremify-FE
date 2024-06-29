"use client";
import { CardComponent } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { SigninForm, SigninFormData } from "@/components/SigninForm";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/AuthProvider";

export default function Page() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);

  const onSubmit = async (data: SigninFormData) => {
    try {
      await signIn(data.email, data.password);
      router.push("/profile");
    } catch (error) {
      // Error is already handled in the signIn function
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-auto px-3">
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
