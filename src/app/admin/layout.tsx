"use client"
import React from 'react'





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <div lang="en" style={{backgroundColor: "green", width: "100%"}}>

               {children}

    </div>
  )
}

