import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gemini Worlds',
  description: 'Explore infinite procedurally generated worlds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
