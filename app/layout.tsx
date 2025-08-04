// app/layout.tsx
import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import Navbar and Footer
import { Navbar } from "@/components/go-club/Navbar";
import { Footer } from "@/components/go-club/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eugene Go Club", // Updated title
  description: "Eugene, Oregon's premier community for the game of Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
         
          {children}
          <Footer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
