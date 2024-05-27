// RootLayout.js
import React from 'react'
import {ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton} from '@clerk/nextjs'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<ClerkProvider>
      <html lang="en">
        <body>
          <header>
          
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
