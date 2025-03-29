import type { Metadata } from "next";
import { Inter, Source_Sans_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSansPro = Source_Sans_Pro({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "LuchtLeven - Cystic Fibrosis Platform",
  description: "Verbeter uw leven met CF door gezondheidstracking, AI-analyse en persoonlijke begeleiding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSansPro.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 