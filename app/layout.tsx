import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["700", "800"],
});

const body = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "700", "800"],
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
