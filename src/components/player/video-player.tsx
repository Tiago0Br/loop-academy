'use client'

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface IVideoPlayerProps {
  videoId: string
}

export function VideoPlayer({ videoId }: IVideoPlayerProps) {
  return (
    <ReactPlayer
      height="100%"
      width="100%"
      url={`https://www.youtube.com/watch?v=${videoId}`}
      playing
      controls
    />
  )
}
