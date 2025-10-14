import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ConditionalLayout } from "./conditional-layout";

export const metadata: Metadata = {
  title: "IV API Product Viewer",
  description: "Test harness for IV Internal API product data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
