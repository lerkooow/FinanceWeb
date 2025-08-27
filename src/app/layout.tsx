import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.scss";
import { Header } from "./components/Header";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
