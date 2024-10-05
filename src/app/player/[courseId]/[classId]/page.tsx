import { PlayerHeader } from '@/components/player/player-header'

interface PlayerProps {
  params: {
    courseId: string
    classId: string
  }
}

export default function PlayerPage({
  params: { courseId, classId },
}: PlayerProps) {
  return (
    <>
      <PlayerHeader
        title="API Rest, Node e Typescript: #01 - Apresentação do curso"
        subTitle="API Rest, Node e Typescript"
      />
      <p>Course ID: {courseId}</p>
      <p>Classe ID: {classId}</p>
    </>
  )
}
