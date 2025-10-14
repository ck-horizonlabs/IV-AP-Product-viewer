import { Providers } from "../providers";
import "../globals.css";

export default function ValidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Completely standalone layout - no header, no nav, no padding
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
