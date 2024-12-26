import { Section } from '@/components/section/section'
import { APIYoutube } from '@/shared/services/api-youtube'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodarSe - Todos os cursos',
}

export default async function Cursos() {
  const courses = await APIYoutube.course.getAll()

  return (
    <main className="mt-8 flex justify-center">
      <div className="w-full min-[920px]:max-w-[920px]">
        <Section title="Todos os Cursos" items={courses} />
      </div>
    </main>
  )
}
