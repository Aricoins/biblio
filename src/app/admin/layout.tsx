"use client"
import React from 'react'
import  NavFoot from '../components/NavFoot'
import NavTop from '../components/NavTop'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <div lang="en" style={{backgroundColor: "black"} }>
      <NavTop/>

               {children}
<NavFoot/>
    </div>
  )
}

