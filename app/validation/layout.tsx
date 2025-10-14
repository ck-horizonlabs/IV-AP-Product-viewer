import type { Metadata } from "next";
import { Providers } from "../providers";
import "../globals.css";

export const metadata: Metadata = {
  title: "IV API Product Validation",
  description: "Product validation interface for IV Internal API",
};

export default function ValidationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
