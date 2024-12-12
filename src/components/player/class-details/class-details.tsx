'use client'

import { useRouter } from 'next/navigation'
import { VideoPlayer } from './video-player'
import { IPlayerClassGroupProps } from '../playlist/player-class-group'
import { useMemo } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

interface IClassDetailsProps {
  classId: string
  courseId: string
  classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[]
}

export function ClassDetails({
  classId,
  courseId,
  classGroups,
}: IClassDetailsProps) {
  const router = useRouter()
  const nextClassId = useMemo(() => {
    const classes = classGroups.flatMap(({ classes }) => classes)
    const currentClassIndex = classes.findIndex(
      (classItem) => classItem.classId === classId
    )

    const nextClassIndex = currentClassIndex + 1

    if (!classes[nextClassIndex]) {
      return undefined
    }

    return classes[nextClassIndex].classId
  }, [classGroups, classId])

  return (
    <div className="flex-1">
      <div className="aspect-video">
        <VideoPlayer
          videoId="apXQAnFX3JM"
          onPlayNext={() =>
            nextClassId ? router.push(`/player/${courseId}/${nextClassId}`) : {}
          }
        />
      </div>

      <Tabs.Root defaultValue="class-details">
        <Tabs.List className="flex gap-4 border-b border-paper">
          <Tabs.Trigger
            value="class-details"
            className="p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary"
          >
            Visão geral da aula
          </Tabs.Trigger>
          <Tabs.Trigger
            value="class-comments"
            className="p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary"
          >
            Comentários
          </Tabs.Trigger>
          <Tabs.Trigger
            value="course-details"
            className="p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary"
          >
            Visão geral do curso
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="class-details">Detalhes da aula</Tabs.Content>
        <Tabs.Content value="class-comments">Comentários da aula</Tabs.Content>
        <Tabs.Content value="course-details">Detalhes do curso</Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
