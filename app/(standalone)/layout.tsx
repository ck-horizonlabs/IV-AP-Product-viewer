import type { Metadata } from "next";
import { Providers } from "../providers";
import "../globals.css";

export const metadata: Metadata = {
  title: "IV API Product Validation",
  description: "Product validation interface for IV Internal API",
};

export default function StandaloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Completely standalone layout - no header, no nav, no wrapper
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
