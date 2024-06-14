'use client'

import UserForm from '@/components/custom/forms/UserForm'
import DeleteUserForm from '@/components/custom/forms/user-delete-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import {
  User,
  setData,
  setDialog,
  setForm
} from '@/states/redux/store/slices/usersSlice'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { zodUserSchema } from '@/validations/zod'

//
export default function Testt({ data = [] }: Readonly<{ data: User[] }>) {
  const dispatch = useDispatch()
  const { data: users, form } = useSelector((state: RootState) => state.users)

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

  const defaultValues = {
    name: '',
    email: ''
  }

  //
  return (
    <div>
      <h1>Users</h1>
      <Button
        onClick={() => {
          dispatch(setDialog(true))
          dispatch(setForm(null))
        }}
      >
        Create
      </Button>

      <ul>
        {users.map(user => (
          <li key={user._id} className='pb-2'>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Button
              onClick={() => {
                dispatch(setDialog(true))
                dispatch(setForm(user))
              }}
            >
              Edit
            </Button>
            <DeleteUserForm id={user._id} />
          </li>
        ))}
      </ul>
      <UserForm
        data={form}
        name='users'
        schema={zodUserSchema}
        defaultValues={defaultValues}
      />
    </div>
  )
}
