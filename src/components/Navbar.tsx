"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { User } from "@/lib/fetchUser";
import { UserToolTip } from "./UserTollTip";

export function Navbar({ user }: { user: User }) {
  const pathname = usePathname();
  const isSignInRoute = pathname === "/signin";

  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-5 md:px-10 ">
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
        {user ? (
          <UserToolTip />
        ) : (
          <Link href={isSignInRoute ? "signup" : "signin"}>
            <Button type="submit" className="px-6  text-md font-semibold">
              {isSignInRoute ? "Sign Up" : "Sign In"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
