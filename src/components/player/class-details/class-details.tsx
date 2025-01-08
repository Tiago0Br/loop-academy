'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useMemo, useRef } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { IPlayerClassGroupProps } from '../playlist/player-class-group'
import { VideoPlayer, IVideoPlayerRef } from './video-player'
import { ClassHeader } from './class-header'
import { Comments } from './comments/comments'
import { ICommentProps } from './comments/comment'

const CourseHeader = dynamic(
  import('@/components/course-header/course-header').then(
    (res) => res.CourseHeader
  ),
  { ssr: false }
)

const comments: ICommentProps[] = [
  {
    author: {
      image: 'https://github.com/Tiago0Br.png',
      name: 'Tiago Lopes',
    },
    content: 'Opa, essa aula é muito boa!',
    likesCount: 2,
    publishedAt: '2023-06-24T10:00:00.000Z',
    replies: [
      {
        author: {
          image: 'https://github.com/Tiago0Br.png',
          name: 'Tiago Lopes',
        },
        content: 'Eu achei bem fraquinha.',
        likesCount: 1,
        publishedAt: '2023-12-24T10:00:00.000Z',
      },
    ],
  },
  {
    author: {
      image: 'https://github.com/Tiago0Br.png',
      name: 'Tiago Lopes',
    },
    content: 'Top demais da conta!',
    likesCount: 200,
    publishedAt: '2024-12-24T10:00:00.000Z',
  },
]

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
          videoId="tGbAfFRC9p0"
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

        <Tabs.Content className="px-2" value="class-details">
          <ClassHeader
            title={classItem.title}
            description={classItem.description}
            onTimeClick={(seconds) =>
              videoPlayerRef.current?.setProgress(seconds)
            }
          />
        </Tabs.Content>
        <Tabs.Content className="px-2" value="class-comments">
          <Comments comments={comments} />
        </Tabs.Content>
        <Tabs.Content className="px-2" value="course-details">
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
