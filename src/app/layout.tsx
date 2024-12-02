import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin-ext"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <title>Droplo - Łukasz Kurczab</title>
      <meta
        name="description"
        content="Page created as recruiting task by Łukasz Kurczab"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <body className={inter.variable}>{children}</body>
    </html>
  );
}
