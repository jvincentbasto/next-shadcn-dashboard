'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/states/redux/store'
import { deleteUser } from '@/states/redux/store/slices/usersSlice'
import { AsyncThunk } from '@reduxjs/toolkit'

//
type TProps = {
  deleteData?: AsyncThunk<any, any, {}>
  id: string
}

//
export default function DeleteUserForm({ deleteData, id }: Readonly<TProps>) {
  const asyncDispatch = useAppDispatch()

  //
  const handleDelete = async () => {
    if (deleteData) {
      asyncDispatch(deleteUser(id))
    }
  }

  //
  return <Button onClick={handleDelete}>Delete</Button>
}
