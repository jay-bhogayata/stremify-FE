import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import fetchUser from "@/lib/fetchUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "stremify",
  description: "A video streaming platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen dark:bg-[#09090B]`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar user={user} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
