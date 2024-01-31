"use client "
import type { Metadata } from 'next'


import Link from 'next/link'


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
         <body >
         {children}
   
      </body>

 
   
    </html>
  )
}
