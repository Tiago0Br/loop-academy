import { Metadata } from 'next'
import { StartCourse } from '@/components/start-course/start-course'
import { CourseHeader } from '@/components/course-header/course-header'
import { CourseContent } from '@/components/course-content/course-content'

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
        <div className="flex-[2] flex flex-col gap-14 pb-12">
          <CourseHeader
            title="Figma para devs"
            description="
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illo ad
              ex. Veritatis delectus dicta sed quaerat ipsum ducimus vero aut libero
              nobis. Vitae, dolore magni excepturi voluptatibus recusandae facere?
            "
            numberOfClasses={48}
          />

          <CourseContent
            classGroups={[
              {
                title: 'NextJS com TailwindCSS e Typescript',
                courseId: '123',
                classes: [
                  {
                    id: '1',
                    title:
                      'NextJS, TailwindCSS e Typescript: #27 - Criando componente de Grupo de aula',
                  },
                  {
                    id: '2',
                    title:
                      'NextJS, TailwindCSS e Typescript: #28 - Apresentação do protótipo',
                  },
                  {
                    id: '3',
                    title:
                      'NextJS, TailwindCSS e Typescript: #29 - Finalizando o projeto!',
                  },
                ],
              },
              {
                title: 'Estilizando o projeto com TailwindCSS',
                courseId: '123',
                classes: [
                  {
                    id: '1',
                    title:
                      'NextJS, TailwindCSS e Typescript: #27 - Criando componente de Grupo de aula',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
