import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "FinanceWeb",
  description: "A web application for managing personal finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
