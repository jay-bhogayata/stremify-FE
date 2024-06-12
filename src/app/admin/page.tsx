import { Nav } from "@/components/Nav";
import fetchUser, { User } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user: User = await fetchUser();
  if (!user || (user && user.role !== "admin")) {
    redirect("/profile");
  }
  return (
    <>
      <Nav />
      <div>
        <h1>Page only for admin</h1>
      </div>
    </>
  );
}
