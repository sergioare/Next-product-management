
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import { useMode } from "./_MUI/theme";
import AppMui from "./_MUI/AppMui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login to get access to dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppMui>{children}</AppMui>
      </body>
    </html>
  );
}
