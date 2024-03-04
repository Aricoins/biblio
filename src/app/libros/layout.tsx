// Import necessary dependencies and components
import type { Metadata } from 'next'
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";
import Link from 'next/link'

// Define metadata for the page
export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Graciela Morán de Di Biase",
}

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval';"> </meta>

      </head>
      <body>
        <NavTop />
        {children}
        <NavFoot />
      </body>
    </html>
  )
}
