import type { Metadata } from "next";
import { Inter, Source_Sans_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSansPro = Source_Sans_Pro({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "LuchtLeven - Cystic Fibrosis Platform",
  description: "Een platform voor CF-patiënten en hun artsen in Nederland",
  keywords: ["CF", "Cystic Fibrosis", "gezondheid", "longziekte", "Nederlands"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSansPro.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 