import { ReactNode } from 'react'
import RootPublicLayout from '@/components/custom/layouts/RootPublicLayout'

export default function HomeLayout({
  children
}: {
  readonly children: ReactNode
}) {
  //
  return <RootPublicLayout>{children}</RootPublicLayout>
}
