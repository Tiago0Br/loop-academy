import { ClassDetails, PlayerHeader, PlayerPlaylist } from '@/components/player'

interface PlayerProps {
  params: {
    courseId: string
    classId: string
  }
}

const classGroups = [
  {
    title: 'Introdução e apresentação do projeto',
    classes: [
      {
        title: 'API Rest, Node e Typescript: #01 - Apresentação do curso',
        done: true,
        classId: '12',
      },
      {
        title: 'API Rest, Node e Typescript: #02 - Primeiro componente',
        classId: '123',
      },
    ],
  },
  {
    title: 'Primeiro componente',
    classes: [
      {
        title: 'API Rest, Node e Typescript: #04 - Estilização com Tailwind',
        classId: '1234',
      },
    ],
  },
]

export default function PlayerPage({
  params: { courseId, classId },
}: PlayerProps) {
  return (
    <main className="flex flex-col gap-2 h-screen">
      <PlayerHeader
        title="API Rest, Node e Typescript: #01 - Apresentação do curso"
        subTitle="API Rest, Node e Typescript"
      />

      <div className="flex gap-2 h-[calc(100vh-64px-8px)]">
        <div className="max-w-96">
          <PlayerPlaylist
            courseId={courseId}
            playingClassId={classId}
            classGroups={classGroups}
          />
        </div>

        <ClassDetails
          courseId={courseId}
          classId={classId}
          classGroups={classGroups}
        />
      </div>
    </main>
  )
}
