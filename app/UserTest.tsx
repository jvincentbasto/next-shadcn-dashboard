'use client'

import UserForm from '@/components/custom/forms/UserForm'
import DeleteUserForm from '@/components/custom/forms/user-delete-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import {
  TDynamicData,
  createDocumentSlice,
  deleteDynamicDocument
} from '@/states/redux/store/slices/dynamicSlice'
import injectSlice from '@/states/redux/store/injectSlice'

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
export const UserTest = ({ data = [] }: Readonly<{ data: TDynamicData[] }>) => {
  const dispatch = useDispatch()

  //
  const { schemaName } = dynamicSchema

  //
  const document = createDocumentSlice(schemaName)
  const { reducer, actions } = document

  //
  injectSlice(schemaName, reducer)
  const { setData, setDialog, setForm } = actions
  const deleteDocument = deleteDynamicDocument(schemaName)

  //
  const { data: stateData } = useSelector(
    (state: RootState) => state[schemaName]
  )

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

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
        {stateData.map((item: { [key: string]: any }) => (
          <li key={item._id} className='pb-2'>
            <h2>{item.name}</h2>
            <p>{item.email}</p>
            <Button
              onClick={() => {
                dispatch(setDialog(true))
                dispatch(setForm(item))
              }}
            >
              Edit
            </Button>
            <DeleteUserForm deleteData={deleteDocument} id={item._id} />
          </li>
        ))}
      </ul>
      <UserForm schemaName={schemaName} fields={fields} setDialog={setDialog} />
    </div>
  )
}

export default UserTest
