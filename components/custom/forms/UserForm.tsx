'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import { setZodObject } from '@/validations/zod'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import CustomForm from './CustomForm'
import {
  createDynamicDocument,
  updateDynamicDocument
} from '@/states/redux/store/slices/dynamicSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

//
type TProps = {
  schemaName: string
  fields: TFieldObject[]
  setDialog: ActionCreatorWithPayload<any>
}

//
export const UserForm = ({ schemaName, fields = [], setDialog }: TProps) => {
  const name = schemaName as keyof RootState
  const { form } = useSelector((state: RootState) => state[name])

  //
  const createDocument = createDynamicDocument(schemaName)
  const updateDocument = updateDynamicDocument(schemaName)

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
      createData={createDocument}
      updateData={updateDocument}
      //
      title={form ? `Update ${schemaName}` : `Create ${schemaName}`}
      description={
        form ? `Update ${schemaName} details` : `Create a new ${schemaName}`
      }
    />
  )
}

export default UserForm
