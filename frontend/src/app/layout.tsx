import type { Metadata } from "next";
import { Manrope, Meddon } from "next/font/google";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { Providers } from "@/components/global/Providers";
import { GlobalCanvasWrapper } from "@/components/global/GlobalCanvasWrapper";
import { SidebarNav } from "@/components/global/SidebarNav";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
});

const meddon = Meddon({
  subsets: ["latin"],
  variable: "--font-meddon",
  weight: "400",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "YP Gurukul | Premium Education",
  description: "Professional coaching institute website for YP Gurukul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${meddon.variable} flex flex-col min-h-screen relative font-sans`}>
        <Providers>
          <GlobalCanvasWrapper />
          {/* Fixed sidebar spine navigation — appears after hero scroll */}
          <SidebarNav />
          <Navbar />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
