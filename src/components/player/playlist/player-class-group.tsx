'use client'

import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { IPlayerClassProps, PlayerClass } from './player-class'

export interface IPlayerClassGroupProps {
  title: string
  position: number
  classes: (Pick<IPlayerClassProps, 'done' | 'title'> & { id: string })[]
  open?: boolean
  onToggle: () => void
  playingClassId: string
  onPlay: (classId: string) => void
  onCheck: (classId: string) => void
}

export function PlayerClassGroup({
  title,
  position,
  classes,
  open,
  playingClassId,
  onToggle,
  onPlay,
  onCheck,
}: IPlayerClassGroupProps) {
  function getFinishedClasses() {
    return classes.filter(({ done }) => done)
  }

  return (
    <div className="flex flex-col">
      <button
        className="flex gap-2 p-4 bg-paper items-center active:opacity-80"
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
        {classes.map((classItem) => (
          <li key={classItem.id}>
            <PlayerClass
              {...classItem}
              playing={classItem.id === playingClassId}
              onPlay={() => onPlay(classItem.id)}
              onCheck={() => onCheck(classItem.id)}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
