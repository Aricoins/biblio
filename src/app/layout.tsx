// RootLayout.js
import React from 'react'
import {ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton} from '@clerk/nextjs'
import {esES } from "@clerk/localizations";
import { Analytics } from '@vercel/analytics/react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<ClerkProvider localization={esES}
appearance={{
  variables: { colorPrimary: "#000000" },
  elements: {
    formButtonPrimary:
      "bg-black border border-black border-solid hover:bg-white hover:text-black",
    socialButtonsBlockButton:
      "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
    socialButtonsBlockButtonText: "font-semibold",
    formButtonReset:
      "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
    membersPageInviteButton:
      "bg-black border border-black border-solid hover:bg-white hover:text-black",
    card: "bg-[#fafafa]",
  },
}}
>
      <html lang="en" >
        <body style={{backgroundImage: "url(./bgif.webp"}}>
          <header>
          
          </header>
          <main>
            {children}
            <Analytics />
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}