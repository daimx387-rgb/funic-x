import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/lenis.css";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard — Funic X",
  description: "AI-native platform dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me" />
      </head>
      <body className="bg-[#050505]">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
