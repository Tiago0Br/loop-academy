import Image from 'next/image'
import { MdArrowDropDown, MdThumbUp } from 'react-icons/md'

export function Comment() {
  return (
    <div className="flex gap-2 items-start">
      <Image
        src="https://github.com/Tiago0Br.png"
        width={40}
        height={40}
        alt="Foto de perfil"
        draggable={false}
        className="rounded-full"
      />
      <div className="p-2 bg-paper flex flex-col gap-4 flex-1 rounded">
        <div className="flex gap-2 items-center">
          <span className="font-bold">name</span>
          <span className="font-extrabold text-xs opacity-50">
            25/12/2023 às 10:30
          </span>
        </div>
        <p>comment</p>
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <MdThumbUp size={16} />
            <span>5</span>
          </div>

          <button className="flex gap-1 items-center text-primary">
            <MdArrowDropDown size={24} />
            <span>Ver resposta</span>
          </button>
        </div>
      </div>
    </div>
  )
}
