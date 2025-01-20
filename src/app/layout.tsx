import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

interface IRootLayout extends Readonly<{ children: React.ReactNode }> {}

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loop Academy - Cursos gratuitos',
  description: 'Portal de cursos gratuitos do Youtube em PT-BR',
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="shortcut icon"
          href="/loop-academy-icon.png"
          type="image/png"
        />
      </head>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
