'use client'

import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { Class } from './Class'
import { useState } from 'react'

export interface IClassGroupProps {
  title: string
  courseId: string
  classes: {
    id: string
    title: string
  }[]
}

export function ClassGroup({ title, courseId, classes }: IClassGroupProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen((state) => !state)}
        className="flex items-center gap-6 p-4 bg-paper"
      >
        {open ? (
          <MdKeyboardArrowDown size={24} />
        ) : (
          <MdKeyboardArrowRight size={24} />
        )}
        {title}
      </button>
      <ol data-open={open} className="flex flex-col data-[open=false]:hidden">
        {classes.map(({ id, title }) => (
          <Class
            key={id}
            title={title}
            playerUrl={`/cursos/${courseId}/aulas/${id}`}
          />
        ))}
      </ol>
    </>
  )
}
