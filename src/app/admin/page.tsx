import { Button } from "@/components/ui/button";
import fetchUser, { User } from "@/lib/fetchUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user: User = await fetchUser();
  if (!user || (user && user.role !== "admin")) {
    redirect("/profile");
  }
  return (
    <div className="flex flex-col px-5 md:px-10 ">
      <h1 className="text-2xl font-semibold my-5">Admin Dashboard</h1>
      <Link href="/admin/movie">
        <Button>Manage Movies</Button>
      </Link>
    </div>
  );
}
