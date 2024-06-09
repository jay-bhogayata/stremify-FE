import fetchUser from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await fetchUser();
  if (!user) {
    redirect("/signin");
  }
  return (
    <h1>
      <h1>Profile</h1>
      <h2>Id: {user?.id}</h2>
      <h2>Name: {user?.name}</h2>
      <h2>Email: {user?.email}</h2>
      <h2>Role: {user?.role}</h2>
      <h2>Verified: {user?.verified ? "Yes" : "No"}</h2>
    </h1>
  );
}
