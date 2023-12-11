import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/providers/next-theme-provider";
import AppStateProvider from '@/lib/providers/state-provider';
import { twMerge } from "tailwind-merge";
const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge('bg-background',inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppStateProvider>
          {children}
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
