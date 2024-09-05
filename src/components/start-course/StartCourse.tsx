'use client'

import Link from 'next/link'
import { MdPlayCircleOutline } from 'react-icons/md'
import { useInView } from 'react-intersection-observer'

interface IStartCourseProps {
  title: string
  courseId: string
  classId: string
  imageUrl: string
}

export function StartCourse({
  title,
  courseId,
  classId,
  imageUrl,
}: IStartCourseProps) {
  const [ref, inView] = useInView({ threshold: 0.2, initialInView: true })

  return (
    <>
      <div ref={ref} className="p-3 bg-paper rounded-md flex flex-col gap-4">
        <Link
          href={`/cursos/${courseId}/aulas/${classId}`}
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
          className="w-full bg-cover bg-no-repeat aspect-video bg-center rounded-md"
        >
          <div className="w-full h-full flex items-center justify-center bg-background rounded opacity-0 hover:opacity-70 transition-opacity">
            <MdPlayCircleOutline size={58} />
          </div>
        </Link>
        <Link
          href={`/cursos/${courseId}/aulas/${classId}`}
          className="bg-primary py-2 px-3 rounded text-center"
        >
          Começar curso
        </Link>
      </div>

      {!inView && (
        <div className="py-3 px-2 bg-paper flex flex-col gap-4 absolute left-0 right-0 top-14">
          <h1 className="font-extrabold text-xl">{title}</h1>
          <Link
            href={`/cursos/${courseId}/aulas/${classId}`}
            className="bg-primary py-2 px-3 rounded text-center"
          >
            Começar curso
          </Link>
        </div>
      )}
    </>
  )
}
