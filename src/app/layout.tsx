import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import ReduxProvider from "./providers";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  description: "Music streaming platform",
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
        <ReduxProvider>
          <div className="grid grid-cols-12">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3 md:sticky md:top-0 md:h-screen bg-black/15">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-9 min-w-0 bg-black/15">
              <div className="sticky top-0 h-14 z-40">
                <Header />
              </div>

              <div className="px-5 pb-[150px] md:pb-20">
                <TooltipProvider>{nav}</TooltipProvider>
              </div>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}