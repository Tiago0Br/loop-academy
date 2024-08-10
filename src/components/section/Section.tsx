import { Card, ICardProps } from '@/components/card/Card'

interface ISectionProps {
  title: string
  variant?: 'grid' | 'h-list'
  cards?: ICardProps[]
}

const defaultCards: ICardProps[] = [
  {
    href: '/cursos/123',
    image: 'https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg',
    title: 'Curso API Rest com Node e Typescript',
    description: 'Descrição do curso',
  },
  {
    href: '/cursos/123',
    image: 'https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg',
    title: 'Curso API Rest com Node e Typescript',
    description: 'Descrição do curso',
  },
  {
    href: '/cursos/123',
    image: 'https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg',
    title: 'Curso API Rest com Node e Typescript',
    description: 'Descrição do curso',
  },
]

export function Section({
  title,
  variant = 'grid',
  cards = defaultCards,
}: ISectionProps) {
  return (
    <section className="flex flex-col gap-4 px-4">
      <h2 className="font-bold text-xl">{title}</h2>
      <ul
        data-variant={variant}
        className="
          grid gap-2 grid-cols-1 sm:grid-cols-none
          data-[variant=grid]:sm:grid-cols-2 data-[variant=grid]:md:grid-cols-3
          data-[variant=h-list]:sm:grid-flow-col data-[variant=h-list]:sm:overflow-x-auto
        "
      >
        {cards.map((card, index) => (
          <li
            key={`${card.title}-${index}`}
            data-variant={variant}
            className="w-full data-[variant=h-list]:sm:w-72"
          >
            <Card {...card} />
          </li>
        ))}
      </ul>
    </section>
  )
}
