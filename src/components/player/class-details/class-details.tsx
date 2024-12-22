'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useRef } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { IPlayerClassGroupProps } from '../playlist/player-class-group'
import { CourseHeader } from '@/components/course-header/course-header'
import { VideoPlayer, IVideoPlayerRef } from './video-player'
import { ClassHeader } from './class-header'

interface IClassDetailsProps {
  course: {
    title: string
    description: string
    numberOfClasses: number
  }
  classItem: {
    title: string
    description: string
  }
  classId: string
  courseId: string
  classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[]
}

export function ClassDetails({
  course,
  classItem,
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

  const videoPlayerRef = useRef<IVideoPlayerRef>(null)

  return (
    <div className="flex-1 overflow-auto pb-10">
      <div className="aspect-video">
        <VideoPlayer
          ref={videoPlayerRef}
          videoId="apXQAnFX3JM"
          onPlayNext={() =>
            nextClassId ? router.push(`/player/${courseId}/${nextClassId}`) : {}
          }
        />
      </div>

      <Tabs.Root defaultValue="class-details">
        <Tabs.List className="flex gap-4 border-b border-paper mb-2">
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

        <Tabs.Content value="class-details">
          <ClassHeader
            title={classItem.title}
            description={classItem.description}
            onTimeClick={(seconds) =>
              videoPlayerRef.current?.setProgress(seconds)
            }
          />
        </Tabs.Content>
        <Tabs.Content value="class-comments">Comentários da aula</Tabs.Content>
        <Tabs.Content value="course-details">
          <CourseHeader
            description={course.description}
            title={course.title}
            numberOfClasses={course.numberOfClasses}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
