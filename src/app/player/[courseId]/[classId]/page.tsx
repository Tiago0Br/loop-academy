import { ClassDetails, PlayerHeader, PlayerPlaylist } from '@/components/player'
import { APIYoutube } from '@/shared/services/api-youtube'

interface PlayerProps {
  params: {
    courseId: string
    classId: string
  }
}

export default async function PlayerPage({
  params: { courseId, classId },
}: PlayerProps) {
  const courseDetails = await APIYoutube.course.getById(courseId)
  const classDetails = await APIYoutube.class.getById(classId)

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
            classGroups: courseDetails.classGroups,
          }}
          classItem={{
            id: classId,
            title: classDetails.title,
            description: classDetails.description,
            videoId: classDetails.videoId,
            likesCount: classDetails.likesCount,
            commentsCount: classDetails.commentsCount,
            viewsCount: classDetails.viewsCount,
          }}
        />
      </div>
    </main>
  )
}
