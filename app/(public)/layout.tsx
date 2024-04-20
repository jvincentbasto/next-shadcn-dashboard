import { ReactNode } from 'react'
import RootPublicLayout from '@/components/custom/layouts/root-public-layout'

export default async function HomeLayout({
  children
}: {
  readonly children: ReactNode
}) {
  //
  return <RootPublicLayout>{children}</RootPublicLayout>
}
