'use client'

import dynamic from 'next/dynamic'
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MdPlayCircle } from 'react-icons/md'
import type TReactPlayer from 'react-player'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface IVideoPlayerProps {
  videoId: string
  onPlayNext: () => void
}

export interface IVideoPlayerRef {
  setProgress: (progress: number) => void
}

// eslint-disable-next-line react/display-name
export const VideoPlayer = forwardRef<IVideoPlayerRef, IVideoPlayerProps>(
  ({ videoId, onPlayNext }, playerRefToForward) => {
    const [progress, setProgress] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<TReactPlayer>()

    const secondsUntilEnd = useMemo(() => {
      if (!videoId) return undefined

      return totalDuration ? totalDuration - progress : undefined
    }, [totalDuration, progress, videoId])

    const showPlayNextButton = useMemo(() => {
      return !!(secondsUntilEnd && secondsUntilEnd <= 30)
    }, [secondsUntilEnd])

    useImperativeHandle(
      playerRefToForward,
      () => {
        return {
          setProgress(seconds) {
            playerRef.current?.seekTo(seconds, 'seconds')
            wrapperRef.current?.scrollIntoView({ behavior: 'smooth' })
          },
        }
      },
      []
    )

    return (
      <div ref={wrapperRef} className="h-full">
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
          onReady={(ref) => (playerRef.current = ref)}
          onEnded={onPlayNext}
          onProgress={({ playedSeconds }) => setProgress(playedSeconds)}
          onDuration={(duration) => setTotalDuration(duration)}
        />
      </div>
    )
  }
)
