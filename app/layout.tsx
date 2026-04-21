import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { ConditionalFooter } from "../components/ConditionalFooter";
import { ToastProvider } from "../components/toast/ToastProvider";

const headlineFont = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GharFinder - Premium Rentals",
  description: "Find your next home with GharFinder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headlineFont.variable} ${bodyFont.variable} antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-screen flex flex-col bg-background font-body text-on-surface">
        <Navbar />
        <main className="flex-1">
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
