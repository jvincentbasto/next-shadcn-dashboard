'use client'

import DynamicForm from '@/components/custom/forms/DynamicForm'
import DeleteUserForm from '@/components/custom/forms/user-delete-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/states/redux/store'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import {
  TDynamicData,
  createDocumentSlice,
  createDynamicDocument,
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
const schema = {
  name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true,
    unique: true
  }
}
const sample = {
  name: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  age: { type: 'Number', min: 0 },
  isActive: { type: 'Boolean', default: true },
  address: {
    street: { type: 'String' },
    city: { type: 'String' },
    state: { type: 'String' },
    zip: { type: 'Number' }
  }
}
const schemaDefinition = JSON.stringify(sample)
const parsedSchemaDefinition = JSON.parse(schemaDefinition)

const samplePost = {
  name: 'sample',
  email: 'sample@example.com',
  isActive: true
}

//
const dynamicSchema = {
  schemaName: 'User',
  formName: 'users',
  schemaType: 'site',
  schema,
  fields
}

//
export const UserTest = ({ data = [] }: Readonly<{ data: TDynamicData[] }>) => {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch()

  //
  const { schemaName, formName } = dynamicSchema

  //
  const documentSlice = createDocumentSlice(formName, schemaName)
  const { reducer, actions } = documentSlice

  //
  const sampleName = 'SampleUser'
  useEffect(() => {
    injectSlice(formName, reducer)
  }, [])

  //
  const { setData, setDialog, setForm } = actions
  const deleteDocument = deleteDynamicDocument(formName, schemaName)

  //
  const { data: stateData } = useSelector((state: RootState) => state[formName])

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

  const createDocument = createDynamicDocument(sampleName, schemaName)

  //
  return (
    <div>
      <h1>Users</h1>
      <Button
        onClick={() => {
          dispatch(setDialog(true))
          dispatch(setForm(null))

          // //
          // const payload = {
          //   modelName: sampleName,
          //   schemaDefinition,
          //   data: samplePost
          // }
          // if (createDocument) {
          //   appDispatch(createDocument(payload))
          // }
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
      <DynamicForm
        formName={formName}
        schemaName={schemaName}
        fields={fields}
        setDialog={setDialog}
      />
    </div>
  )
}

export default UserTest
