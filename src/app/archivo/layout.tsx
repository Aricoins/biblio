"use client"
import React from 'react'
import style from './style.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={style.body}> {children}</body>
    </html>
  )
}
