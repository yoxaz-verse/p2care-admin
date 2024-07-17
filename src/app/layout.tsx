import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const quicksand = Quicksand({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "P2Care-Admin",
  description: "Admin Website for P2Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
