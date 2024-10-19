'use client'

import { PlayerGroupClass } from '@/components/player/player-group-class'
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
    <main className="flex flex-col gap-10">
      <PlayerHeader
        title="API Rest, Node e Typescript: #01 - Apresentação do curso"
        subTitle="API Rest, Node e Typescript"
      />
      <PlayerGroupClass
        title="Introdução e apresentação do projeto"
        position={1}
        open
        classes={[
          {
            title: 'API Rest, Node e Typescript: #01 - Apresentação do curso',
            done: true,
          },
          {
            title: 'API Rest, Node e Typescript: #02 - Primeiro componente',
            playing: true,
          },
          {
            title:
              'API Rest, Node e Typescript: #03 - Estilização com Tailwind',
          },
        ]}
        onToggle={() => {}}
      />
    </main>
  )
}
