'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RootState, useAppSelector, useAppDispatch } from '@/states/redux/store'
import { useDispatch } from 'react-redux'
import CustomFormDialog from './CustomFormDialog'
import CustomFormFields from './inputs/CustomFormFields'
import { DefaultValues, Path, PathValue } from 'react-hook-form'
import { TypeOf, z } from 'zod'
import { Form } from '@/components/ui/form'
import { ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit'
import { useFormBySchema } from '@/lib/hooks/reactHookForm'
import {
  TFieldDocument,
  TNameFormats,
  TSchemaDefinition
} from '@/db/mongodb/utilities'
import { TRouteFields } from '@/db/mongodb/utilities/documents'

//
type TFormData<T> = {
  formName: keyof RootState
  formSchema: T
  formFields: TFieldDocument[]
  defaultValues: DefaultValues<z.TypeOf<any>>
}

//
type TFormActions = {
  [key: string]: any
  setDialog: ActionCreatorWithPayload<boolean>
}

//
type TAsyncCallback = AsyncThunk<any, any, {}>
type TAsyncActions = {
  [key: string]: any
  setDialog: ActionCreatorWithPayload<boolean>
  createCb?: TAsyncCallback
  updateCb?: TAsyncCallback
}

//
type TSchemaDocument = {
  [key: string]: any
  schemaName?: string
  schemaDefinition?: TSchemaDefinition
  schemaFields?: TRouteFields[]
}

//
type TProperties = {
  [key: string]: any
  title?: string
  description?: string
  form?: TNameFormats
}

//
type TProps<T> = {
  data?: { [key: string]: any } | null
  formData: TFormData<T>
  //
  formActions: TFormActions
  asyncActions: TAsyncActions
  schema?: TSchemaDocument
  //
  properties?: TProperties
}

//
export const CustomForm = <
  TSchema extends z.ZodType<any, any>
  // TValues extends z.infer<TSchema>
>({
  data,
  formData,
  //
  formActions,
  asyncActions,
  schema,
  //
  properties
}: TProps<TSchema>) => {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch()

  //
  const { formName, formSchema, formFields, defaultValues } = formData

  //
  const { setDialog } = formActions
  const { createCb, updateCb } = asyncActions
  const { schemaName, schemaDefinition, schemaFields } = schema ?? {}

  //
  const { title, description, form: formFormat } = properties ?? {}
  const { singular } = formFormat ?? {
    singular: 'Document',
    plural: 'Documents'
  }

  //
  const selector = useAppSelector(formName)
  const { loading, dialog } = selector

  //
  const form = useFormBySchema(formSchema, defaultValues)
  const { handleSubmit, setValue, reset, setError } = form

  //
  const zodFields = Object.keys(defaultValues).map(key => key) ?? []
  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        const field = key as Path<TypeOf<TSchema>>
        const match = zodFields.includes(field)

        //
        if (!match && !value) continue

        //
        const fieldValue = value as PathValue<
          TypeOf<TSchema>,
          Path<TypeOf<TSchema>>
        >
        setValue(field, fieldValue)
      }
    } else {
      reset()
    }
  }, [JSON.stringify(data)])

  //
  const customHandleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = formSchema.safeParse(values)

    //
    if (!result.success) {
      // const mainError = result.error.errors
      const fieldErrors = result.error.formErrors.fieldErrors

      //
      for (const [key, value] of Object.entries(fieldErrors)) {
        const field = key as Path<TypeOf<TSchema>>
        const match = zodFields.includes(field)
        if (!match) continue

        //
        const errors = value as string[]
        setError(field, {
          type: 'submit',
          message: errors.length > 0 ? errors?.[0] : ''
        })
      }

      //
      return
    }

    //
    try {
      let payload: { [key: string]: any } = {
        data: values,
        modelName: schemaName,
        schemaDefinition,
        fields: schemaFields
      }

      //
      if (data) {
        if (updateCb) {
          appDispatch(updateCb(payload))
        }
      } else {
        if (createCb) {
          appDispatch(createCb(payload))
        }
      }

      //
      dispatch(setDialog(false))
      reset()
    } catch (error) {
      console.error('Error Submit:', error)
    }
  }

  //
  const contentFields = formFields.map(field => {
    const zodField = field.name as Path<TypeOf<TSchema>>
    const match = zodField && zodFields.includes(zodField)

    //
    if (!match) return null
    return (
      <CustomFormFields
        key={zodField}
        form={form}
        name={zodField}
        field={field}
      />
    )
  })

  //
  const contentForm = (
    <Form {...form}>
      <form onSubmit={handleSubmit(customHandleSubmit)}>
        <div className='mt-6 grid w-full items-center gap-4'>
          {contentFields}
          <Button type='submit' className='mt-1' disabled={loading}>
            {data ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )

  //
  let defaultTitle = data ? `Update ${singular}` : `Create ${singular}`
  let defaultDescription = data
    ? `Update ${singular} details`
    : `Create a new ${singular}`

  //
  defaultTitle = title ?? defaultTitle
  defaultDescription = description ?? defaultDescription

  //
  const handleDialogOpen = (value: boolean) => {
    dispatch(setDialog(value))
    reset()
  }

  //
  return (
    <CustomFormDialog
      enableTrigger={false}
      title={defaultTitle}
      description={defaultDescription}
      dialogOpen={dialog}
      dialogOnOpenChange={(value: boolean) => {
        handleDialogOpen(value)
      }}
    >
      {contentForm}
    </CustomFormDialog>
  )
}

export default CustomForm
