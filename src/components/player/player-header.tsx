import { MdHome } from 'react-icons/md'

interface IPlayerHeaderProps {
  title: string
  subTitle: string
}

export function PlayerHeader({ title, subTitle }: IPlayerHeaderProps) {
  return (
    <div className="flex items-center gap-4 bg-paper px-4">
      <MdHome size={28} />
      <div className="flex flex-col gap-1 py-1">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <h2 className="line-clamp-1">{subTitle}</h2>
      </div>
    </div>
  )
}
