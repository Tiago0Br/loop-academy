import dynamic from 'next/dynamic'
import { UrlMatcher } from 'interweave-autolink'
import { useMemo } from 'react'
import type { MatcherInterface } from 'interweave'

const Interweave = dynamic(
  () => import('interweave').then((mod) => mod.Interweave),
  { ssr: false }
)

interface IClassHeaderProps {
  title: string
  description: string
  onTimeClick: (seconds: number) => void
}

export function ClassHeader({
  title,
  description,
  onTimeClick
}: IClassHeaderProps) {
  const urlMatcher = useMemo(
    () =>
      new UrlMatcher('UrlMatcher', { validateTLD: false }, ({ url }) => (
        <a target="_blank" href={url}>
          {url}
        </a>
      )),
    []
  )

  const timeMatcher = useMemo(() => {
    function handleTimeClick(time: string) {
      const [seconds = 0, minutes = 0, hours = 0] = time
        .split(':')
        .reverse()
        .map(Number)
      const resultSeconds = seconds + minutes * 60 + hours * 3600
      onTimeClick(resultSeconds)
    }
    return {
      asTag: () => 'button',
      propName: 'TimeMatcher',
      inverseName: 'NoTimeMatcher',
      createElement: (children, props) => (
        <button
          className="text-primary hover:underline"
          key={props.key}
          onClick={() => handleTimeClick(children.toString())}
        >
          {children}
        </button>
      ),
      match: (content) => {
        const result = content.match(/^\d{2}:\d{2}/)

        const firstElement = result?.at(0)
        if (!result || result.index === undefined || !firstElement) return null

        return {
          valid: true,
          match: firstElement,
          index: result.index,
          length: firstElement.length
        }
      }
    } satisfies MatcherInterface
  }, [onTimeClick])

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-extrabold text-xl">{title}</h3>

      <Interweave content={description} matchers={[urlMatcher, timeMatcher]} />
    </div>
  )
}
