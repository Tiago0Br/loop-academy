import { Section } from '@/components/section/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Todos os cursos',
}

export default function Cursos() {
  return (
    <main className="mt-8 flex justify-center">
      <div className="min-[920px]:max-w-[920px]">
        <Section title="Todos os Cursos" />
      </div>
    </main>
  )
}
