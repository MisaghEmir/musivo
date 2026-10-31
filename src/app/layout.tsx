
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MUSIVO",
  description: "Discover and listen to your favorite music.",
};

export default function RootLayout({
  children,
  nav,
}: Readonly<{
  children: React.ReactNode;
  nav: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        <Providers>
          <div className="grid grid-cols-12">
            <div className="md:col-span-3 hidden md:block sticky top-0 h-screen bg-black/15">
              <Sidebar />
            </div>

            <div className="md:col-span-9 col-span-12 md:px-5 bg-black/15">
              <div className="sticky top-0 h-14 z-40">
                <Header />
              </div>

              <div className="pb-20 px-5">
                {nav}
                {children}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-full md:hidden">
            {/* <MusicPlayerSmall /> */}
          </div>
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
