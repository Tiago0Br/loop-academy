import { Comment } from './comment'

export function Comments() {
  return (
    <div className="flex flex-col gap-2">
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}
