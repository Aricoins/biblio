

import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
