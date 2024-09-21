import Link from 'next/link'
import { MdPlayCircle } from 'react-icons/md'

export function KeepWatching() {
  return (
    <Link
      href={`/player/1/1`}
      className="flex gap-8 p-4 bg-primary rounded-lg hover:no-underline"
    >
      <div className="flex flex-col gap-2 flex-1">
        <h1 className="font-bold line-clamp-1">
          NextJS, Typescript e TailwindCSS: #01 - Iniciando o projeto
        </h1>
        <p className="line-clamp-1">NextJS, Typescript e TailwindCSS</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <span className="hidden sm:inline">Continue assistindo</span>
        <MdPlayCircle size={24} />
      </div>
    </Link>
  )
}
