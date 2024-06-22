'use client'

import UserForm from '@/components/custom/forms/UserForm'
import DeleteUserForm from '@/components/custom/forms/user-delete-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import {
  User,
  setData,
  setDialog,
  setForm,
  deleteUser
} from '@/states/redux/store/slices/usersSlice'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'

//
export const UserTest = ({ data = [] }: Readonly<{ data: User[] }>) => {
  const dispatch = useDispatch()
  const { data: users } = useSelector((state: RootState) => state.users)

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

  //
  const fields: TFieldObject[] = [
    {
      typeValue: 'string',
      typeInput: 'text',
      id: 'name',
      name: 'name',
      slug: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
      description: 'Enter Name',
      required: false,
      disabled: false,
      defaultValue: '',
      typeOptions: [
        {
          name: 'min',
          defaultValue: 1,
          error: 'Name is required'
        }
      ]
    },
    {
      typeValue: 'string',
      typeInput: 'email',
      id: 'email',
      name: 'email',
      slug: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      description: 'Enter Email',
      required: false,
      disabled: false,
      defaultValue: '',
      typeOptions: [
        {
          name: 'min',
          defaultValue: 1,
          error: 'Email is required'
        }
      ]
    }
    // {
    //   typeValue: 'string',
    //   typeInput: 'text',
    //   id: 'url',
    //   name: 'url',
    //   slug: 'url',
    //   label: 'Url',
    //   placeholder: 'Enter Url',
    //   description: 'Enter Url',
    //   required: false,
    //   disabled: false,
    //   defaultValue: '',
    //   typeOptions: [
    //     {
    //       name: 'min',
    //       defaultValue: 1,
    //       error: 'Url is required'
    //     }
    //   ]
    // }
  ]

  //
  const dynamicSchema = {
    schemaName: 'users',
    schemaType: 'site',
    fields
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
            <DeleteUserForm deleteData={deleteUser} id={user._id} />
          </li>
        ))}
      </ul>
      <UserForm schemaName={dynamicSchema.schemaName} fields={fields} />
    </div>
  )
}

export default UserTest
