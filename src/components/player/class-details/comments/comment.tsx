'use client'

import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp, MdThumbUp } from 'react-icons/md'

export interface ICommentProps {
  content: string
  likesCount: number
  publishedAt: string
  author: {
    image: string
    name: string
  }
  replies?: ICommentProps[]
}

export function Comment({
  content,
  likesCount,
  publishedAt,
  author,
  replies = []
}: ICommentProps) {
  const [showReplies, setShowReplies] = useState(false)
  const date = useMemo(() => {
    const dateAsDate = parseISO(publishedAt)

    return format(dateAsDate, 'dd/MM/yyyy -- HH:mm').replace('--', 'às')
  }, [publishedAt])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-start">
        <Image
          src={author.image}
          width={40}
          height={40}
          alt="Foto de perfil"
          draggable={false}
          className="rounded-full"
        />
        <div className="p-2 bg-paper flex flex-col gap-4 flex-1 rounded">
          <div className="flex gap-2 items-center">
            <span className="font-bold">{author.name}</span>
            <span className="font-extrabold text-xs opacity-50">{date}</span>
          </div>
          <p>{content}</p>
          <div className="flex gap-4">
            <div className="flex gap-1 items-center">
              <MdThumbUp size={16} />
              <span>{likesCount}</span>
            </div>

            {replies.length > 0 && (
              <button
                className="flex gap-1 items-center text-primary"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? (
                  <MdArrowDropUp size={24} />
                ) : (
                  <MdArrowDropDown size={24} />
                )}
                <span>
                  {showReplies ? 'Ocultar' : 'Ver'} respostas ({replies.length})
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pl-12">
        {showReplies &&
          replies.map((reply) => {
            return (
              <Comment key={reply.publishedAt + reply.content} {...reply} />
            )
          })}
      </div>
    </div>
  )
}
