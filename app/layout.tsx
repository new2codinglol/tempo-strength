import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

/* One family, four weights. A grotesque with a signage lineage rather than an
   editorial one — the product is a clock you read mid-set, not a magazine.
   Archivo's numerals are the reason it is here: tabular, even, and legible at
   a glance from arm's length. */
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={sans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
