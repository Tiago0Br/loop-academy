import { Header } from '@/components/header/header'

interface ILayout extends Readonly<{ children: React.ReactNode }> {}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
