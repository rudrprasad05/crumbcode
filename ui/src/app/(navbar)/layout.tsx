import Header from "@/components/global/header";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}
