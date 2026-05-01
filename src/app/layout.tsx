import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

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
          <nav className="w-full border-b bg-white px-6 py-3 flex justify-between">
            <span className="font-semibold text-xl">AgriExchange</span>

            <div className="flex gap-4">
              <a href="/" className="hover:text-green-600">Marketplace</a>
              <a href="/create" className="hover:text-green-600">Sell</a>
            </div>
          </nav>
          {/* --- NAVBAR END --- */}

          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}