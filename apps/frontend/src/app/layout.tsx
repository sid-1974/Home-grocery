import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeGrocery | Smart Grocery Shopping List & Sharing",
  description:
    "The easiest way to create, manage, and share your grocery shopping lists. Organize your shopping, save time, and share with family and friends for free.",
  keywords: [
    "grocery list",
    "shopping list",
    "share grocery list",
    "grocery planner",
    "smart shopping",
    "HomeGrocery",
  ],
  authors: [{ name: "HomeGrocery Team" }],
  creator: "HomeGrocery",
  publisher: "HomeGrocery",
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
    title: "HomeGrocery | Smart Grocery Shopping List & Sharing",
    description:
      "The easiest way to create, manage, and share your grocery shopping lists. Organize your shopping, save time, and share with family and friends for free.",
    url: "https://home-grocery-frontend.vercel.app", // Adjusted to your Vercel URL
    siteName: "HomeGrocery",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeGrocery | Smart Grocery Shopping List & Sharing",
    description: "Create and share your grocery lists easily with HomeGrocery.",
  },
  icons: {
    icon: "/favicon.ico",
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
              name: "HomeGrocery",
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
