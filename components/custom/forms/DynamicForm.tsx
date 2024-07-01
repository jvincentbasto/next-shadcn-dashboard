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
  formName: string
  fields: TFieldObject[]
  setDialog: ActionCreatorWithPayload<any>
  //
  schemaName: string
  schemaDefinition?: { [key: string]: any }
  schemaFields?: { [key: string]: any }[]
}

//
export const DynamicForm = ({
  formName,
  fields = [],
  setDialog,
  //
  schemaName,
  schemaDefinition,
  schemaFields
}: TProps) => {
  const name = formName as keyof RootState
  const { form } = useSelector((state: RootState) => state[name])

  //
  const createDocument = createDynamicDocument(formName, schemaName)
  const updateDocument = updateDynamicDocument(formName, schemaName)

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
      formSchema={zodSchema}
      formFields={fields}
      defaultValues={defaultValues}
      //
      setDialog={setDialog}
      createData={createDocument}
      updateData={updateDocument}
      //
      title={form ? `Update ${formName}` : `Create ${formName}`}
      description={
        form ? `Update ${formName} details` : `Create a new ${formName}`
      }
      //
      schemaName={schemaName}
      schemaDefinition={schemaDefinition}
      schemaFields={schemaFields}
    />
  )
}

export default DynamicForm
