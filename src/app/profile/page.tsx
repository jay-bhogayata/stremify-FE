import { Nav } from "@/components/Nav";
import { Button } from "@/components/ui/button";
import fetchUser from "@/lib/fetchUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await fetchUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <>
      <Nav />

      <div className="flex flex-col justify-center items-center my-auto  px-3 ">
        <h1 className="text-2xl font-semibold my-5 ">Profile</h1>
        <div>
          <h2>Id: {user?.id}</h2>
          <h2>Name: {user?.name}</h2>
          <h2>Email: {user?.email}</h2>
          <h2>Role: {user?.role}</h2>
          <h2>Verified: {user?.verified ? "Yes" : "No"}</h2>
          {/* if user is admin add button to go admin dashboard */}
          {user?.role === "admin" && (
            <Link href="/admin">
              <Button>Admin Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
