'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RootState, useAppSelector, useAppDispatch } from '@/states/redux/store'
import { useDispatch } from 'react-redux'
import CustomFormDialog from './CustomFormDialog'
import CustomFormFields, { TFieldObject } from './inputs/CustomFormFields'
import { DefaultValues, Path, PathValue } from 'react-hook-form'
import { TypeOf, z } from 'zod'
import { Form } from '@/components/ui/form'
import { ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit'
import { useFormBySchema } from '@/lib/hooks/reactHookForm'

//
type Props<TSchema> = {
  data?: { [key: string]: any } | null
  name: keyof RootState
  //
  schema: TSchema
  fields: TFieldObject[]
  defaultValues: DefaultValues<z.TypeOf<any>>
  //
  setDialog: ActionCreatorWithPayload<any>
  createData?: AsyncThunk<any, any, {}>
  updateData?: AsyncThunk<any, any, {}>
  //
  title?: string
  description?: string
}

//
export const CustomForm = <
  TSchema extends z.ZodType<any, any>
  // TValues extends z.infer<TSchema>
>({
  data,
  name,
  //
  schema,
  fields,
  defaultValues,
  //
  setDialog,
  createData,
  updateData,
  //
  title,
  description
}: Props<TSchema>) => {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch()
  const { loading, dialog } = useAppSelector(name)

  //
  const form = useFormBySchema(schema, defaultValues)
  const { handleSubmit, setValue, reset, setError } = form

  //
  const zodFields = Object.keys(defaultValues).map(key => key) ?? []

  //
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
    }
  }, [JSON.stringify(data)])

  //
  const customHandleSubmit = async (values: z.infer<typeof schema>) => {
    const result = schema.safeParse(values)

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
      let payload = { ...values }
      if (data) {
        payload = { ...payload, _id: data?._id }
        if (updateData) {
          appDispatch(updateData(payload))
        }
      } else {
        if (createData) {
          appDispatch(createData(payload))
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
  const contentForm = (
    <Form {...form}>
      <form onSubmit={handleSubmit(customHandleSubmit)}>
        <div className='mt-6 grid w-full items-center gap-4'>
          {fields.map(field => {
            //
            const zodField = field.name as Path<TypeOf<TSchema>>
            const match = zodField && zodFields.includes(zodField)

            //
            if (!match) return null

            //
            return (
              <CustomFormFields
                key={field.name}
                form={form}
                name={zodField}
                options={field}
              />
            )
          })}
          <Button type='submit' className='mt-1' disabled={loading}>
            {data ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  )

  //
  let defaultTitle = data ? 'Update Document' : 'Create Document'
  let defaultDescription = data
    ? 'Update document details'
    : 'Create a new document'

  //
  defaultTitle = title ?? defaultTitle
  defaultDescription = description ?? defaultDescription

  //
  return (
    <CustomFormDialog
      enableTrigger={false}
      title={defaultTitle}
      description={defaultDescription}
      dialogOpen={dialog}
      dialogOnOpenChange={(value: boolean) => {
        dispatch(setDialog(value))
        reset()
      }}
    >
      {contentForm}
    </CustomFormDialog>
  )
}

export default CustomForm
