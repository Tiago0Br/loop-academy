import Image from 'next/image'
import Link from 'next/link'

export interface ICardProps {
  id: string
  thumbnail: string
  title: string
  description: string
}

export function Card({ id, thumbnail, title, description }: ICardProps) {
  return (
    <Link href={`/cursos/${id}`} className="hover:no-underline">
      <article className="flex flex-col gap-2 p-2 rounded sm:hover:bg-primary">
        <Image
          height={0}
          width={1000}
          className="aspect-video object-cover rounded sm:rounded-2xl md:rounded-[.5rem]"
          src={thumbnail}
          alt={`Logo do curso "${title}"`}
          draggable={false}
        />
        <h4 className="font-extrabold text-lg">{title}</h4>
        <p className="line-clamp-3 sm:line-clamp-4 md:line-clamp-5">
          {description}
        </p>
      </article>
    </Link>
  )
}
