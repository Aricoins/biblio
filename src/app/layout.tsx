"use client "
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import NavTop from "./components/NavTop"
const inter = Inter({ subsets: ['latin'] })
import NavFoot from './components/NavFoot'

import Text from './components/text'

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
      <head>
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';"/>
      </head>
         <body className={inter.className}>      
              {children}
          </body>

 
   
    </html>
  )
}