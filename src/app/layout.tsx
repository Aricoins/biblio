"use client "
import type { Metadata } from 'next'
import './globals.css'


interface CspConfig {
  'default-src': string;
  'script-src': string;
  // ... other CSP directives as needed
}

interface ExtendedMetadata extends Metadata {
  csp?: CspConfig; // Optional csp property
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