import { Section } from '@/components/section/section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Todos os cursos',
}

export default function Cursos() {
  return (
    <main className="mt-8 flex justify-center">
      <div className="w-full min-[920px]:max-w-[920px]">
        <Section title="Todos os Cursos" />
      </div>
    </main>
  )
}
