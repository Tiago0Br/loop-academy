'use client'

import { MdShare } from 'react-icons/md'
import { CollapsibleText } from './CollapsibleText'
import { CopyContent } from './CopyContent'

interface ICourseHeaderProps {
  title: string
  description: string
  numberOfClasses: number
}

export function CourseHeader({
  title,
  description,
  numberOfClasses,
}: ICourseHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold text-xl">{title}</h1>
      <CollapsibleText numberOfLinesWhenClosed={1}>
        {description}
      </CollapsibleText>

      <div className="flex items-center gap-2">
        <CopyContent
          title="Copie o conteúdo abaixo"
          content={window.location.href}
        >
          <button className="py-2 px-4 bg-paper rounded-full flex gap-2 items-center">
            <MdShare />
            Compartilhar
          </button>
        </CopyContent>

        <span>{numberOfClasses} aulas</span>
      </div>
    </div>
  )
}
