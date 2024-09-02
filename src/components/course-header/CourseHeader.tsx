'use client'

import { MdShare } from 'react-icons/md'
import { CollapsibleText } from './CollapsibleText'
import { CopyContent } from './CopyContent'

export function CourseHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-extrabold text-xl">Curso de Figma para devs</h1>
      <CollapsibleText numberOfLinesWhenClosed={1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illo ad
        ex. Veritatis delectus dicta sed quaerat ipsum ducimus vero aut libero
        nobis. Vitae, dolore magni excepturi voluptatibus recusandae facere?
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

        <span>48 aulas</span>
      </div>
    </div>
  )
}
