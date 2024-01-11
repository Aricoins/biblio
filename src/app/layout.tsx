import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Navbar from "../app/components/Nav"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Graciela Morán de Di Biase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<Navbar />
      <body className={inter.className}>

        {children}
     
      </body>
   
    </html>
  )
}
