'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdPlayCircle } from 'react-icons/md'
import {
  type IKeepWatching,
  LocalStorage
} from '@/shared/services/local-storage'

export function KeepWatching() {
  const [data, setData] = useState<IKeepWatching | null>(null)

  useEffect(() => {
    setData(LocalStorage.keepWatching.get())
  }, [])

  if (!data) return null

  return (
    <Link
      href={`/player/${data.courseId}/${data.classId}`}
      className="flex gap-8 p-4 bg-primary rounded-lg hover:no-underline"
    >
      <div className="flex flex-col gap-2 flex-1">
        <h1 className="font-bold line-clamp-1">{data.className}</h1>
        <p className="line-clamp-1">{data.courseName}</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <span className="hidden sm:inline">Continue assistindo</span>
        <MdPlayCircle size={24} />
      </div>
    </Link>
  )
}
