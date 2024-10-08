'use client'

import '@/app/ui/global.css'
import StoreProvider from '@/app/(pages)/StoreProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        {children}
      </html>
    </StoreProvider>
  );
}
