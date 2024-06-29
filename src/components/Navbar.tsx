"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserTollTip } from "./UserTollTip";
import { useAuthStore } from "@/components/AuthProvider";

export function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="fixed z-50 top-0 left-0 right-0 flex h-14 items-center gap-4 border-b bg-background px-5 md:px-10">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <h1 className="font-bold text-2xl text-violet-600">Stremify</h1>
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        {isLoggedIn ? (
          <UserTollTip />
        ) : (
          <Link href={pathname === "/signin" ? "/signup" : "/signin"}>
            <Button type="submit" className="px-6 text-md font-semibold">
              {pathname === "/signin" ? "Sign Up" : "Sign In"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
