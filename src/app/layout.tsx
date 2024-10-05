import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

interface IRootLayout extends Readonly<{ children: React.ReactNode }> {}

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodarSe - Os melhores cursos de programação gratuitos',
  description: 'Cursos de programação gratuitos e com certificado',
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
