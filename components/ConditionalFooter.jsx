"use client";
import { usePathname } from "next/navigation";
import { Footer } from "../components/Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return !isDashboard ? <Footer /> : null;
}