'use client'

import { MdCheckCircle, MdCircle, MdPlayCircleOutline } from 'react-icons/md'

export interface IPlayerClassProps {
  title: string
  playing?: boolean
  done?: boolean
  onPlay: () => void
  onCheck: () => void
}

export function PlayerClass({
  title,
  playing,
  done,
  onPlay,
  onCheck,
}: IPlayerClassProps) {
  function handleCheck(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    onCheck()
  }

  return (
    <button className="flex gap-6 p-4 items-center" onClick={onPlay}>
      <div className="group" onClick={handleCheck}>
        {done ? (
          <MdCheckCircle size={24} className="min-w-6 text-green-400" />
        ) : (
          <>
            <MdPlayCircleOutline
              size={24}
              className="min-w-6 group-hover:hidden"
            />
            <MdCircle size={24} className="hidden min-w-6 group-hover:block" />
          </>
        )}
      </div>

      <div className="flex flex-col gap-1 items-start">
        <p
          data-done={done}
          className="line-clamp-2 text-start data-[done=true]:text-green-400"
        >
          {title}
        </p>
        {playing && (
          <span className="px-2 py-1 bg-blue-400 rounded-full leading-4">
            Reproduzindo
          </span>
        )}
      </div>
    </button>
  )
}
