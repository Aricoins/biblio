"use client "

import NavTop from "../components/NavTop";
import NavFoot from "../components/NavFoot";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
         <body>

          <NavTop />
         {children}
         <NavFoot />
   
      </body>

 
   
    </html>
  )
}
