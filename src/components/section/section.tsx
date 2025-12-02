'use client'

import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'
import { useRef } from 'react'
import { Card, type ICardProps } from '@/components/card/card'

interface ISectionProps {
  title: string
  variant?: 'grid' | 'h-list'
  items: ICardProps[]
}

export function Section({ title, variant = 'grid', items }: ISectionProps) {
  const scrollRef = useRef<HTMLUListElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    if (direction === 'left') {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      })

      return
    }

    scrollRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  return (
    <section className="flex flex-col gap-4 px-4">
      <h2 className="font-bold text-xl">{title}</h2>
      <ul
        ref={scrollRef}
        data-variant={variant}
        className="
          grid gap-2 grid-cols-1 sm:grid-cols-none
          data-[variant=grid]:sm:grid-cols-2 data-[variant=grid]:md:grid-cols-3
          data-[variant=h-list]:sm:grid-flow-col data-[variant=h-list]:sm:overflow-x-auto
        "
      >
        {variant === 'h-list' && (
          <button
            onClick={() => handleScroll('left')}
            className="hidden sm:flex size-14 bg-primary rounded-full justify-center items-center sticky my-auto left-0 -ml-14"
          >
            <MdOutlineChevronLeft size={32} />
          </button>
        )}

        {items.map((course, index) => (
          <li
            key={`${course.title}-${index}`}
            data-variant={variant}
            className="w-full data-[variant=h-list]:sm:w-72"
          >
            <Card {...course} />
          </li>
        ))}

        {variant === 'h-list' && (
          <button
            onClick={() => handleScroll('right')}
            className="hidden sm:flex size-14 bg-primary rounded-full justify-center items-center sticky my-auto right-0 -mr-14"
          >
            <MdOutlineChevronRight size={32} />
          </button>
        )}
      </ul>
    </section>
  )
}
