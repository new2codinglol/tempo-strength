import type { Metadata } from "next";
import { Michroma, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: ["400"],
});

const body = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tempo — twenty minutes, three times a week",
  description:
    "A strength app for people with a job. Four blocks, twenty minutes, a barbell or a pair of dumbbells. The app picks the weight; you show up.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
