'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import {
  createUser,
  setDialog,
  updateUser
} from '@/states/redux/store/slices/usersSlice'
import { setZodObject } from '@/validations/zod'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import CustomForm from './CustomForm'

//
type TProps = {
  schemaName: string
  fields: TFieldObject[]
}

//
export const UserForm = ({ schemaName, fields = [] }: TProps) => {
  const name = schemaName as keyof RootState
  const { form } = useSelector((state: RootState) => state[name])

  //
  let defaultValues = {}
  for (const field of fields) {
    const { name, defaultValue: value } = field

    //
    if (!name) continue
    defaultValues = { ...defaultValues, [name]: value }
  }

  //
  const zodSchema = setZodObject(fields)

  //
  return (
    <CustomForm
      data={form}
      name={name}
      //
      schema={zodSchema}
      fields={fields}
      defaultValues={defaultValues}
      //
      setDialog={setDialog}
      createData={createUser}
      updateData={updateUser}
      //
      title={form ? `Update ${schemaName}` : `Create ${schemaName}`}
      description={
        form ? `Update ${schemaName} details` : `Create a new ${schemaName}`
      }
    />
  )
}

export default UserForm
