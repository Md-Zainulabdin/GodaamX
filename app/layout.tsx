import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { APP_DESCRIPTION, APP_TITLE } from "@/constants/constants";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_TITLE}`,
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
