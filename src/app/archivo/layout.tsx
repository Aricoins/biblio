"use client"
import React from 'react'





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <div lang="en">

               {children}

    </div>
  )
}