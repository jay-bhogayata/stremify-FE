import { Navbar } from "@/components/Navbar";

export default function MoviePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="py-10">{children}</main>
    </div>
  );
}
