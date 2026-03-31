import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import SoundToggle from "@/components/shared/SoundToggle";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Matha-Cola - Fun Math Game for Kids!",
  description: "A fizzy, fun math game that helps kids learn addition, subtraction, multiplication and division!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} h-full`}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-fredoka)]">
        <SoundToggle />
        {children}
      </body>
    </html>
  );
}
