import { Metadata } from 'next'
import { StartCourse } from '@/components/start-course/StartCourse'
import { CourseHeader } from '@/components/course-header/CourseHeader'

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
      <div className="w-full min-[920px]:max-w-[920px] px-2 lg:px-0 flex flex-col md:flex-row-reverse gap-4">
        <div className="flex-1">
          <StartCourse
            title="Curso de Figma para devs"
            courseId={id}
            classId="1"
            imageUrl="https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg"
          />
        </div>
        <div className="flex-[2]">
          <CourseHeader />
        </div>
      </div>
    </main>
  )
}
