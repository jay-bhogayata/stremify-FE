import { Nav } from "@/components/Nav";
import fetchUser, { User } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User = await fetchUser();
  if (!user || (user && user.role !== "admin")) {
    redirect("/profile");
  }
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
