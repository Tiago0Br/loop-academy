'use client'

import { useRouter } from 'next/navigation'
import { VideoPlayer } from './video-player'
import { IPlayerClassGroupProps } from '../playlist/player-class-group'
import { useMemo } from 'react'

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
    </div>
  )
}
