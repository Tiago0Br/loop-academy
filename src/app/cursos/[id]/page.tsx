import { CourseHeader } from '@/components/course-header/CourseHeader'
import { Metadata } from 'next'

interface CourseDetailsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params: { id },
}: CourseDetailsProps): Promise<Metadata> {
  return {
    title: `Detalhes do curso: ${id}`,
    description: `Detalhes do curso: ${id}`,
  }
}

export default function CourseDetailsPage({
  params: { id },
}: CourseDetailsProps) {
  return (
    <main className="mt-8 flex justify-center">
      <div className="w-full min-[920px]:max-w-[920px]">
        <CourseHeader />
      </div>
    </main>
  )
}
