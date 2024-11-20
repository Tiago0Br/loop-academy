'use client'

import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import { MdPlayCircle } from 'react-icons/md'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface IVideoPlayerProps {
  videoId: string
  onPlayNext: () => void
}

export function VideoPlayer({ videoId, onPlayNext }: IVideoPlayerProps) {
  const [progress, setProgress] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const secondsUntilEnd = useMemo(() => {
    if (!videoId) return undefined

    return totalDuration ? totalDuration - progress : undefined
  }, [totalDuration, progress, videoId])

  const showPlayNextButton = useMemo(() => {
    return !!(secondsUntilEnd && secondsUntilEnd <= 30)
  }, [secondsUntilEnd])

  return (
    <>
      {showPlayNextButton && (
        <button
          onClick={onPlayNext}
          className="bg-primary py-3 px-4 rounded-lg font-bold flex gap-2 items-center absolute right-4 top-36"
        >
          Próxima aula em {secondsUntilEnd?.toFixed(0)}{' '}
          <MdPlayCircle size={24} />
        </button>
      )}
      <ReactPlayer
        height="100%"
        width="100%"
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing
        controls
        onEnded={onPlayNext}
        onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
        onDuration={(duration) => setTotalDuration(duration)}
      />
    </>
  )
}
