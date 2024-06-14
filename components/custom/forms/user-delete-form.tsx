'use client'

import { Button } from '@/components/ui/button'
import { useAsyncDispatch } from '@/states/redux/store'
import { deleteUser } from '@/states/redux/store/slices/usersSlice'

export default function DeleteUserForm({
  id
}: Readonly<{
  id: string
}>) {
  const asyncDispatch = useAsyncDispatch()

  //
  const handleDelete = async () => {
    asyncDispatch(deleteUser(id))
  }

  //
  return <Button onClick={handleDelete}>Delete</Button>
}
