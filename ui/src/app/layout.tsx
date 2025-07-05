import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crumb Code | Online Cake Shop",
  description:
    "Crumb Code is your go-to online cake shop offering freshly baked cakes, cupcakes, and desserts for every occasion. Order now for fast delivery and unforgettable flavors.",
  keywords: [
    "Crumb Code",
    "online cake shop",
    "cake delivery",
    "birthday cakes",
    "custom cakes",
    "cupcakes",
    "desserts",
    "order cake online",
    "freshly baked cakes",
  ],
  authors: [{ name: "Crumb Code Team", url: "https://crumbcode.com" }],
  creator: "Crumb Code",
  openGraph: {
    title: "Crumb Code | Freshly Baked Cakes Delivered to You",
    description:
      "Delicious cakes and desserts for every celebration. Shop now at Crumb Code.",
    url: "https://crumbcode.com",
    siteName: "Crumb Code",
    images: [
      {
        url: "https://crumbcode.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crumb Code - Online Cake Shop",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crumb Code | Online Cake Shop",
    description:
      "Order custom cakes, cupcakes, and desserts online with fast delivery.",
    images: ["https://crumbcode.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
