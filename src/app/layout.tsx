import "../styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "AgriExchange",
  description: "B2B Marketplace for Agriculture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}