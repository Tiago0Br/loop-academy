import { Section } from '@/components/section/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Todos os cursos',
}

export default function Cursos() {
  return (
    <main>
      <Section title="Todos os Cursos" variant="h-list" />
    </main>
  )
}
