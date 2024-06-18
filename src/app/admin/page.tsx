import fetchUser, { User } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user: User = await fetchUser();
  if (!user || (user && user.role !== "admin")) {
    redirect("/profile");
  }
  return (
    <div className="flex justify-center items-center my-auto  px-3">
      <h1>Page only for admin</h1>
    </div>
  );
}
