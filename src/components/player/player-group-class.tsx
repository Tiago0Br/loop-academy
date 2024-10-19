'use client'

import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { IPlayerClassProps, PlayerClass } from './player-class'

interface IPlayerGroupClassProps {
  title: string
  position: number
  classes: Omit<IPlayerClassProps, 'onPlay' | 'onCheck'>[]
  open?: boolean
  onToggle: () => void
}

export function PlayerGroupClass({
  title,
  position,
  classes,
  open,
  onToggle,
}: IPlayerGroupClassProps) {
  function getFinishedClasses() {
    return classes.filter(({ done }) => done)
  }

  return (
    <div className="flex flex-col">
      <button
        className="flex gap-2 p-4 bg-paper items-center"
        onClick={onToggle}
      >
        <div className="bg-background size-12 flex items-center justify-center rounded-full">
          {position}
        </div>

        <div className="flex flex-col flex-1 items-start">
          <span className="font-bold text-start line-clamp-1">{title}</span>
          <span className="text-sm font-light">
            {getFinishedClasses().length}/{classes.length} aulas
          </span>
        </div>

        {open ? (
          <MdKeyboardArrowDown size={28} />
        ) : (
          <MdKeyboardArrowRight size={28} />
        )}
      </button>

      <ol data-open={open} className="flex flex-col data-[open=false]:hidden">
        {classes.map(({ title: classTitle, done, playing }) => (
          <li key={classTitle}>
            <PlayerClass
              title={classTitle}
              done={done}
              playing={playing}
              onPlay={() => {}}
              onCheck={() => {}}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
