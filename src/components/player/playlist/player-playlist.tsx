'use client'

import { useState } from 'react'
import { IPlayerClassGroupProps, PlayerClassGroup } from './player-class-group'
import { useRouter } from 'next/navigation'

interface IPlayerPlaylistProps {
  courseId: string
  playingClassId: string
  classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[]
}

export function PlayerPlaylist({
  courseId,
  classGroups,
  playingClassId,
}: IPlayerPlaylistProps) {
  const router = useRouter()
  const [openedIndex, setOpenedIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col p-4 bg-paper">
        <h3 className="text-lg font-bold">Conteúdo do curso</h3>
      </div>

      <ol>
        {classGroups.map((classGroup, index) => (
          <li key={classGroup.title}>
            <PlayerClassGroup
              {...classGroup}
              open={openedIndex === index}
              position={index + 1}
              playingClassId={playingClassId}
              onToggle={() =>
                setOpenedIndex((current) => (current === index ? null : index))
              }
              onPlay={(classId) =>
                router.push(`/player/${courseId}/${classId}`)
              }
              onCheck={(classId) => console.log(classId)}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
