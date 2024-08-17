import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Head } from "next/document";
import Header from "./Components/header";


const roboto = League_Spartan({
  weight: ['100','300','400','500','700','900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ML Football League",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header/>
        {children}
        </body>
    </html>
  );
}
