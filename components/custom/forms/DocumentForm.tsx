'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/states/redux/store'
import CustomForm from './CustomForm'
import {
  createDynamicDocument,
  TDocumentData,
  updateDynamicDocument
} from '@/states/redux/store/slices/documentSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { TSchemaDocumentParsed } from '@/db/mongodb/utilities'
import {
  setZodDefaultValues,
  setZodDocument
} from '@/validations/zod/utilities'
import { getSchemaFieldValidations } from '@/db/mongodb/utilities/documents'

//
type TActions = {
  [key: string]: any
  setDialog: ActionCreatorWithPayload<boolean>
  setForm: ActionCreatorWithPayload<TDocumentData | null>
}

//
type TProps = {
  [key: string]: any
  schema: TSchemaDocumentParsed
  actions: TActions
}

//
export const DocumentForm = ({ schema, actions }: TProps) => {
  const { setDialog, setForm } = actions
  const { schemaName, formName, schemaDefinition, formFields, nameFormats } =
    schema
  const { form: formFormat } = nameFormats ?? {}

  //
  if (!formName) return null
  const name = formName as keyof RootState
  const { form: data } = useSelector((state: RootState) => state[name])

  //
  if (!formFields) return null
  const zodSchema = setZodDocument(formFields)
  let defaultValues = setZodDefaultValues(formFields)

  //
  const createCb = createDynamicDocument(formName, schemaName)
  const updateCb = updateDynamicDocument(formName, schemaName)

  //
  const formActions = {
    setDialog,
    setForm
  }
  const AsyncActions = {
    setDialog,
    createCb,
    updateCb
  }

  //
  const formData = {
    formName,
    formSchema: zodSchema,
    formFields,
    defaultValues
  }

  //
  const schemaFields = formFields ? getSchemaFieldValidations(formFields) : []
  const schemaData = {
    schemaName,
    schemaDefinition,
    schemaFields
  }

  //
  const { singular } = formFormat ?? {}
  const properties = {
    title: data ? `Update ${singular}` : `Create ${singular}`,
    description: data
      ? `Update ${singular} details`
      : `Create a new ${singular}`,
    form: formFormat
  }

  //
  return (
    <CustomForm
      data={data}
      formData={formData}
      //
      formActions={formActions}
      asyncActions={AsyncActions}
      schema={schemaData}
      //
      properties={properties}
    />
  )
}

export default DocumentForm
