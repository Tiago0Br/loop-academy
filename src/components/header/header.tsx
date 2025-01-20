'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md'

export function Header() {
  const [title, setTitle] = useState('Loop Academy')
  const [drawserVisible, setDrawserVisible] = useState(false)
  const currentPath = usePathname()

  useEffect(() => {
    setTitle(document.title)
    setDrawserVisible(false)
  }, [currentPath])

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawserVisible(false)
    }

    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  return (
    <nav
      className="sticky top-0 flex items-center gap-6 justify-start bg-primary px-6 py-2
        sm:py-4 md:justify-center"
    >
      <button className="sm:hidden" onClick={() => setDrawserVisible(true)}>
        <MdMenu size={24} />
      </button>
      <ul className="flex gap-4 items-center">
        <li className="my-2">
          <Link
            className="outline-offset-4 uppercase font-bold border-2 rounded-md py-2 px-1"
            href="/"
          >
            Loop Academy
          </Link>
        </li>
        <li className="hidden sm:inline">
          <Link
            href="/"
            data-active={currentPath === '/'}
            className="outline-offset-4 data-[active=true]:underline"
          >
            Página inicial
          </Link>
        </li>
        <li className="hidden sm:inline">
          <Link
            data-active={currentPath === '/cursos'}
            className="outline-offset-4 data-[active=true]:underline"
            href="/cursos"
          >
            Cursos
          </Link>
        </li>
        {/* <li className="hidden sm:inline">
          <Link
            href="https://blog.codarse.com"
            target="_blank"
            className="outline-offset-4 flex items-center gap-1"
          >
            Blog
            <MdOutlineOpenInNew />
          </Link>
        </li> */}
      </ul>

      <div
        onClick={() => setDrawserVisible(false)}
        data-visible={drawserVisible}
        className="
            sm:hidden data-[visible=false]:-translate-x-full fixed top-0 left-0 right-0 bottom-0 
            bg-gradient-to-r from-background to-transparent transition-transform
          "
      >
        <ul
          className="w-60 h-full flex flex-col p-4 gap-4 bg-background"
          tabIndex={drawserVisible ? -1 : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <li>
            <Link
              href="/"
              data-active={currentPath === '/'}
              className="data-[active=true]:underline"
            >
              Página inicial
            </Link>
          </li>
          <li>
            <Link
              data-active={currentPath === '/cursos'}
              className="data-[active=true]:underline"
              href="/cursos"
            >
              Cursos
            </Link>
          </li>
          {/* <li>
            <Link
              href="https://blog.codarse.com"
              target="_blank"
              className="flex items-center gap-1"
            >
              Blog
              <MdOutlineOpenInNew />
            </Link>
          </li> */}
        </ul>
      </div>

      <h1 className="sm:hidden line-clamp-1">{title}</h1>
    </nav>
  )
}
