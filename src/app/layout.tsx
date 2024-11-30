import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Droplo - Łukasz Kurczab",
  description: "Page created as recruting task by Łukasz Kurczab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
