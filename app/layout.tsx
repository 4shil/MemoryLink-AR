import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemoryLink AR",
  description: "Scan a Polaroid, unlock digital memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
