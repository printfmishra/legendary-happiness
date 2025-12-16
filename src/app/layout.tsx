import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Network & AI/ML Solutions",
  description: "Expert team delivering innovative solutions | Based in Australia | Specializing in collaborative infrastructure development and secure network architecture",
  keywords: ["Cloud Engineer", "Network Engineer", "AWS", "Azure", "Infrastructure", "DevOps"],
  authors: [{ name: "Atul Mishra" }],
  icons: {
    icon: '/img/short-logo.png',
    shortcut: '/img/short-logo.png',
    apple: '/img/short-logo.png',
  },
  openGraph: {
    title: "Atul Mishra - Cloud & Network Engineer",
    description: "Engineering Cloud Solutions That Scale",
    type: "website",
    images: ['/img/long-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
