import { KeepWatching } from '@/components/keep-watching/keep-watching'
import { Section } from '@/components/section/section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Página inicial',
}

export default function Home() {
  return (
    <main className="mt-8 flex justify-center">
      <div className="w-full min-[920px]:max-w-[920px] flex flex-col gap-4">
        <KeepWatching />
        <Section title="Página inicial" variant="h-list" />
      </div>
    </main>
  )
}
