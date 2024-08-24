import { Section } from '@/components/section/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Página inicial',
}

export default function Home() {
  return (
    <main className="mt-8 flex justify-center">
      <div className="min-[920px]:max-w-[920px]">
        <Section title="Página inicial" variant="h-list" />
      </div>
    </main>
  )
}
