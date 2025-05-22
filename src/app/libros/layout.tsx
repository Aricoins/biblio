"use client ";
import type { Metadata } from "next";
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";
import "../../../globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Graciela Morán de Di Biase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavTop />
      {children}
      <NavFoot />
    </div>
  );
}
