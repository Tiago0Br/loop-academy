import dynamic from 'next/dynamic'
import { UrlMatcher } from 'interweave-autolink'
import { useMemo } from 'react'

const Interweave = dynamic(
  () => import('interweave').then((mod) => mod.Interweave),
  { ssr: false }
)

interface IClassHeaderProps {
  title: string
  description: string
}

export function ClassHeader({ title, description }: IClassHeaderProps) {
  const urlMatcher = useMemo(
    () =>
      new UrlMatcher('UrlMatcher', { validateTLD: false }, ({ url }) => (
        <a target="_blank" href={url}>
          {url}
        </a>
      )),
    []
  )
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-extrabold text-xl">{title}</h3>

      <Interweave content={description} matchers={[urlMatcher]} />
    </div>
  )
}
