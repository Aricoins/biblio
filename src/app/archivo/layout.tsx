"use client"
import React from 'react'
import style from './style.module.css'
import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";
import { Suspense } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
   
    
         <NavTop />
         {children}
         <NavFoot />

  
    </html>
  )
}
