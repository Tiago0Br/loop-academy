'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { IPlayerClassGroupProps, PlayerClassGroup } from './player-class-group'
import { useRouter } from 'next/navigation'
import { LocalStorage } from '@/shared/services/local-storage'

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

  const [watchedContentId, setWatchedContentId] = useState<string[]>([])
  const [openedIndex, setOpenedIndex] = useState<number | null>(
    classGroups.findIndex(({ classes }) =>
      classes.some(({ id }) => id === playingClassId)
    )
  )

  useEffect(() => {
    const watchedContent = LocalStorage.watchedContent.get(courseId)

    if (!watchedContent) return

    setWatchedContentId(watchedContent)
  }, [courseId])

  const classGroupsWithDone = useMemo(() => {
    return classGroups.map((classGroup) => ({
      ...classGroup,
      classes: classGroup.classes.map((classItem) => ({
        ...classItem,
        done: watchedContentId.includes(classItem.id),
      })),
    }))
  }, [watchedContentId, classGroups])

  const handleCheck = useCallback(
    (classId: string) => {
      const newWatchedContent = LocalStorage.watchedContent.toggle(
        courseId,
        classId
      )

      if (!newWatchedContent) {
        return
      }

      setWatchedContentId(newWatchedContent)
    },
    [courseId]
  )

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col p-4 bg-paper">
        <h3 className="text-lg font-bold">Conteúdo do curso</h3>
      </div>

      <ol className="overflow-auto overflow-primary">
        {classGroupsWithDone.map((classGroup, index) => (
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
              onCheck={(classId) => handleCheck(classId)}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
