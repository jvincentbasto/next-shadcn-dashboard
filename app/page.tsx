import { Metadata } from 'next'
import { axiosFetchUsers } from '@/http/axios/api/users'
import dynamic from 'next/dynamic'

//
const UserTest = dynamic(() => import('./UserTest'))

//
export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page'
}

//
export default async function RootPage() {
  const users = await axiosFetchUsers()

  if (!users.success) return null

  //
  return <UserTest data={users.data} />
  // return <p>Home Page</p>
}
