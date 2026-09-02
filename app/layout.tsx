import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";

/* Synchronized Digital Studio, copied to the letter: a high-contrast display
   serif at poster size against a neutral grotesque doing all the small work.
   Bodoni Moda is the closest thing on Google Fonts to the reference's face —
   variable optical sizing, so the hairlines stay hair-thin at 12rem. */
const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600"],
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
