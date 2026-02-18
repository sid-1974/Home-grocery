import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreshMarket | Simple Grocery Cart",
  description: "Create and share your grocery lists easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased selection:bg-green-100 italic-none`}
      >
        {children}
      </body>
    </html>
  );
}
