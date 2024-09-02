'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useEffect, useState } from 'react'
import { MdCheck, MdContentCopy } from 'react-icons/md'

interface ICopyContentProps {
  title: string
  content: string
  children: React.ReactNode
}

export function CopyContent({ title, content, children }: ICopyContentProps) {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    }
  }, [isCopied])

  const handleCopy = () => {
    window.navigator.clipboard.writeText(content)
    setIsCopied(true)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="p-2 bg-paper border border-primary rounded-lg flex flex-col gap-2 min-w-72 max-w-sm">
          <span>{title}</span>
          <div className="flex items-center gap-1">
            <input
              type="text"
              readOnly
              autoFocus
              value={content}
              onFocus={(e) => e.target.select()}
              className="bg-background py-1 px-2 rounded"
            />

            <button className="p-2" onClick={handleCopy}>
              {isCopied ? (
                <MdCheck className="text-primary" />
              ) : (
                <MdContentCopy />
              )}
            </button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
