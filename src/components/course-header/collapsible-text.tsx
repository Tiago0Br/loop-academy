'use client'

import { useState } from 'react'

interface ICollapsibleTextProps {
  numberOfLinesWhenClosed?: number
  children: React.ReactNode
}

export function CollapsibleText({
  numberOfLinesWhenClosed = 2,
  children
}: ICollapsibleTextProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-end">
      <p
        data-open={open}
        style={
          {
            '--number-of-lines': numberOfLinesWhenClosed
          } as React.CSSProperties
        }
        className="data-[open=false]:line-clamp-[var(--number-of-lines)]"
      >
        {children}
      </p>

      <button
        data-open={open}
        onClick={() => setOpen((state) => !state)}
        className="px-1 bg-paper rounded border border-primary data-[open=false]:-mt-7"
      >
        Ver {open ? 'menos' : 'mais'}
      </button>
    </div>
  )
}
