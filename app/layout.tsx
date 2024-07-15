import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ModalProvider } from "@/components/shared/modals/ModalProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect Me",
  description: "Connect people with love",
};

export default function RootLayout({
  children,
  create,
}: Readonly<{
  children: React.ReactNode;
  create: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        {create}
        <Toaster />
        <ModalProvider />
      </body>
    </html>
  );
}
