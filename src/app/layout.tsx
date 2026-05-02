import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "AgriExchange",
  description: "A T3 Stack For B2B Agricultural Marketplace",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          {/* --- NAVBAR START --- */}
          <Navbar />
          {/* --- NAVBAR END --- */}

          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}