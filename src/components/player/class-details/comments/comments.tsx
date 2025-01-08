import { Comment, ICommentProps } from './comment'

interface ICommentsProps {
  comments?: ICommentProps[]
}

export function Comments({ comments = [] }: ICommentsProps) {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment key={comment.publishedAt} {...comment} />
      ))}
    </div>
  )
}
