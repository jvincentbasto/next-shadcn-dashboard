import { ReactNode } from 'react'
import RootPublicLayout from '@/components/custom/layouts/RootPublicLayout'

export default function HomeLayout({
  children
}: {
  readonly children: ReactNode
}) {
  //
  return (
    <RootPublicLayout>
      <div className='flex min-h-screen w-full items-start justify-start bg-muted/40'>
        <div className='min-h-screen w-[250px]'></div>
        {children}
      </div>
    </RootPublicLayout>
  )
}
