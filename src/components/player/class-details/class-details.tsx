'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { MdThumbUp, MdVisibility } from 'react-icons/md'
import { CourseHeader } from '@/components/course-header/course-header'
import { LocalStorage } from '@/shared/services/local-storage'
import { IPlayerClassGroupProps } from '../playlist/player-class-group'
import { VideoPlayer, IVideoPlayerRef } from './video-player'
import { ClassHeader } from './class-header'
import { Comments } from './comments/comments'
import { ICommentProps } from './comments/comment'
import { PlayerPlaylist } from '../playlist/player-playlist'

export interface IClassItem {
  id: string
  title: string
  description: string
  videoId: string
  likesCount: number
  viewsCount: number
  commentsCount: number
}

export interface ICourseItem {
  id: string
  title: string
  description: string
  numberOfClasses: number
  classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[]
}

interface IClassDetailsProps {
  course: ICourseItem
  classItem: IClassItem
  comments: ICommentProps[]
}

export function ClassDetails({
  course,
  classItem,
  comments = [],
}: IClassDetailsProps) {
  const router = useRouter()
  const nextClassId = useMemo(() => {
    const classes = course.classGroups.flatMap(({ classes }) => classes)
    const currentClassIndex = classes.findIndex(({ id }) => id === classItem.id)

    const nextClassIndex = currentClassIndex + 1

    if (!classes[nextClassIndex]) {
      return undefined
    }

    return classes[nextClassIndex].id
  }, [classItem.id, course.classGroups])

  const videoPlayerRef = useRef<IVideoPlayerRef>(null)
  const [currentTab, setCurrentTab] = useState('class-details')

  useEffect(() => {
    const matchMedia = window.matchMedia('(min-width: 768px)')

    const handleMatchMedia = (event: MediaQueryListEvent) => {
      if (event.matches && currentTab === 'course-playlist') {
        setCurrentTab('class-details')
      }
    }

    matchMedia.addEventListener('change', handleMatchMedia)

    return () => matchMedia.removeEventListener('change', handleMatchMedia)
  }, [currentTab])

  useEffect(() => {
    LocalStorage.keepWatching.set({
      courseId: course.id,
      courseName: course.title,
      classId: classItem.id,
      className: classItem.title,
    })
  }, [course.id, course.title, classItem.id, classItem.title])

  const handlePlayerNext = useCallback(() => {
    if (!nextClassId) return

    LocalStorage.watchedContent.toggle(course.id, classItem.id, 'add')
    router.push(`/player/${course.id}/${nextClassId}`)
  }, [nextClassId, course.id, classItem.id, router])

  return (
    <div className="flex-1 overflow-auto pb-10">
      <div className="aspect-video">
        <VideoPlayer
          ref={videoPlayerRef}
          videoId={classItem.videoId}
          onPlayNext={handlePlayerNext}
        />
      </div>

      <div className="flex gap-2 p-2 opacity-50">
        <div className="flex gap-1 items-center">
          <MdVisibility />
          <span>{classItem.viewsCount}</span>
          <span>Visualizações</span>
        </div>
        <a
          className="flex gap-1 items-center"
          href={`https://www.youtube.com/watch?v=${classItem.videoId}`}
          target="_blank"
        >
          <MdThumbUp />
          <span>{classItem.likesCount}</span>
          <span>Curtidas</span>
        </a>
        <div className="flex gap-1 items-center">
          <MdVisibility />
          <span>{classItem.commentsCount}</span>
          <span>Comentários</span>
        </div>
      </div>

      <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
        <Tabs.List className="flex gap-4 border-b border-paper mb-2">
          <Tabs.Trigger
            value="class-details"
            className="p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary"
          >
            Visão geral da aula
          </Tabs.Trigger>
          <Tabs.Trigger
            value="course-playlist"
            className="p-2 flex items-center justify-center border-b-4 border-transparent data-[state=active]:border-primary md:hidden"
          >
            Conteúdo do curso
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
        <Tabs.Content className="px-2 md:hidden" value="course-playlist">
          <PlayerPlaylist
            classGroups={course.classGroups}
            courseId={course.id}
            playingClassId={classItem.id}
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
