import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#16a34a",
};

export const metadata: Metadata = {
  title: "Home Grocery | Smart Grocery Shopping List & Sharing",
  description:
    "The easiest way to create, manage, and share your grocery shopping lists. Organize your shopping, save time, and share with family and friends for free.",
  keywords: [
    "grocery list",
    "shopping list",
    "share grocery list",
    "grocery planner",
    "smart shopping",
    "Home Grocery",
  ],
  authors: [{ name: "Home Grocery Team" }],
  creator: "Home Grocery",
  publisher: "Home Grocery",
  manifest: "/manifest.ts",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Home Grocery",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon-512.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Home Grocery | Smart Grocery Shopping List & Sharing",
    description:
      "The easiest way to create, manage, and share your grocery shopping lists. Organize your shopping, save time, and share with family and friends for free.",
    url: "https://home-grocery-frontend.vercel.app",
    siteName: "Home Grocery",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Grocery | Smart Grocery Shopping List & Sharing",
    description: "Create and share your grocery lists easily with Home Grocery.",
  },
  verification: {
    google: "google3ff1073a28fe478e",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Home Grocery",
              url: "https://home-grocery-frontend.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://home-grocery-frontend.vercel.app/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
