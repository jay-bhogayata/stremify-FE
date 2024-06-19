"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "./ui/button";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Toast } from "./Toast";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function UserToolTip() {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      console.log("logging out");
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        router.push("/");
        router.refresh();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User2 size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/profile">
          <DropdownMenuItem className="hover:bg-none cursor-pointer">
            My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="w-full" onClick={onSubmit}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
