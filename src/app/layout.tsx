// src/app/layout.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // নতুন ইমপোর্ট
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "TechGadget | Premium Tech Store",
  description: "Discover premium tech gadgets for developers and creators.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full antialiased", geist.variable, jetbrainsMono.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <Toaster position="top-center" richColors />
          
          <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>
          
          <Footer /> {/* Footer যুক্ত করা হলো */}
        </AuthProvider>
      </body>
    </html>
  );
}