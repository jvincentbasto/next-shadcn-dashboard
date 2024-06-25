'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/states/redux/store'
import { AsyncThunk } from '@reduxjs/toolkit'

//
type TProps = {
  deleteData?: AsyncThunk<any, any, {}>
  id: string
}

//
export default function DeleteUserForm({ deleteData, id }: Readonly<TProps>) {
  const appDispatch = useAppDispatch()

  //
  const handleDelete = async () => {
    if (deleteData) {
      appDispatch(deleteData(id))
    }
  }

  //
  return <Button onClick={handleDelete}>Delete</Button>
}
