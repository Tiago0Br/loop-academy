import { ClassDetails, PlayerHeader, PlayerPlaylist } from '@/components/player'
import { APIYoutube } from '@/shared/services/api-youtube'
import type { Metadata } from 'next'

interface PlayerProps {
  params: {
    courseId: string
    classId: string
  }
}

export async function generateStaticParams(): Promise<PlayerProps['params'][]> {
  const courses = await APIYoutube.course.getAll()

  const classesByCourse = await Promise.all(
    courses.map((course) => APIYoutube.class.getAllByCourseId(course.id))
  )

  return classesByCourse
    .flatMap((classes) => classes)
    .map(({ classId, courseId }) => ({ classId, courseId }))
}

export async function generateMetadata({
  params: { classId }
}: PlayerProps): Promise<Metadata> {
  const classDetails = await APIYoutube.class.getById(classId)

  return {
    title: classDetails.title,
    description: classDetails.description,
    openGraph: {
      locale: 'pt_BR',
      type: 'video.episode',
      title: classDetails.title,
      description: classDetails.description,
      videos: [`https://www.youtube.com/watch?v=${classDetails.videoId}`]
    }
  }
}

export default async function PlayerPage({
  params: { courseId, classId }
}: PlayerProps) {
  const courseDetails = await APIYoutube.course.getById(courseId)
  const classDetails = await APIYoutube.class.getById(classId)
  const comments = await APIYoutube.comments.getAllByVideoId(
    classDetails.videoId
  )

  return (
    <main className="flex flex-col gap-2 h-screen">
      <PlayerHeader
        title="API Rest, Node e Typescript: #01 - Apresentação do curso"
        subTitle="API Rest, Node e Typescript"
      />

      <div className="flex gap-2 h-[calc(100vh-64px-8px)]">
        <div className="hidden md:block max-w-96">
          <PlayerPlaylist
            courseId={courseId}
            playingClassId={classId}
            classGroups={courseDetails.classGroups}
          />
        </div>

        <ClassDetails
          course={{
            id: courseId,
            title: courseDetails.title,
            description: courseDetails.description,
            numberOfClasses: courseDetails.numberOfClasses,
            classGroups: courseDetails.classGroups
          }}
          classItem={{
            id: classId,
            title: classDetails.title,
            description: classDetails.description,
            videoId: classDetails.videoId,
            likesCount: classDetails.likesCount,
            commentsCount: classDetails.commentsCount,
            viewsCount: classDetails.viewsCount
          }}
          comments={comments}
        />
      </div>
    </main>
  )
}
