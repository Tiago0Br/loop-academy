import Link from 'next/link'
import { MdPlayCircleOutline } from 'react-icons/md'

interface IClassProps {
  title: string
  playerUrl: string
}

export function Class({ title, playerUrl }: IClassProps) {
  return (
    <li>
      <Link
        href={playerUrl}
        className="flex items-center gap-6 p-4 hover:no-underline"
      >
        <MdPlayCircleOutline size={24} /> {title}
      </Link>
    </li>
  )
}
