import { Card } from '@/components/card/Card'

export function Section() {
  return (
    <section className="flex flex-col gap-4 px-4">
      <h2 className="font-bold text-xl">Todos os cursos</h2>
      <ul className="flex flex-col gap-2">
        <li>
          <Card
            href="/cursos/123"
            image="https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg"
            title="Curso API Rest com Node e Typescript"
            description="Descrição do curso"
          />
        </li>
        <li>
          <Card
            href="/cursos/123"
            image="https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg"
            title="Curso API Rest com Node e Typescript"
            description="Descrição do curso"
          />
        </li>
        <li>
          <Card
            href="/cursos/123"
            image="https://i.ytimg.com/vi/bP47qRVRqQs/hqdefault.jpg"
            title="Curso API Rest com Node e Typescript"
            description="Descrição do curso"
          />
        </li>
      </ul>
    </section>
  )
}
