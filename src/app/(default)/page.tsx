import { KeepWatching } from '@/components/keep-watching/keep-watching'
import { Section } from '@/components/section/section'
import { APIYoutube } from '@/shared/services/api-youtube'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loop Academy - Página inicial'
}

export default async function Home() {
  const courses = await APIYoutube.course.getAll()

  return (
    <main className="mt-8 flex justify-center">
      <div className="w-full min-[920px]:max-w-[920px] flex flex-col gap-4">
        <KeepWatching />
        <Section title="Página inicial" items={courses} variant="h-list" />
      </div>
    </main>
  )
}
