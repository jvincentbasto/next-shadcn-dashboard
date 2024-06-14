'use client'

import { useEffect } from 'react'
import {
  TZodUserSchemaFields,
  zodUserSchema,
  zodUserSchemaFields
} from '@/validations/zod'
import { Button } from '@/components/ui/button'
import {
  RootState,
  useAppSelector,
  useAsyncDispatch
} from '@/states/redux/store'
import {
  User,
  createUser,
  setDialog,
  updateUser
} from '@/states/redux/store/slices/usersSlice'
import { useDispatch } from 'react-redux'
import CustomFormDialog from './CustomFormDialog'
import CustomFormFields from './inputs/CustomFormFields'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { useFormBySchema } from '@/lib/hooks/reactHookForm'

//
type Props<TSchema, TValues> = {
  data?: User | null
  name: keyof RootState
  schema: TSchema
  defaultValues: TValues
}

//
export const UserForm = <
  TSchema extends z.ZodType<any, any>,
  TValues extends z.infer<TSchema>
>({
  data,
  name,
  schema,
  defaultValues
}: Props<TSchema, TValues>) => {
  const dispatch = useDispatch()
  const asyncDispatch = useAsyncDispatch()
  const { loading, dialog } = useAppSelector(name)

  //
  const form = useForm<z.infer<typeof zodUserSchema>>({
    resolver: zodResolver(schema),
    defaultValues
  })
  const { handleSubmit, setValue, reset, setError } = form
  // const test = useFormBySchema(schema, defaultValues)

  //
  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        const field = key as TZodUserSchemaFields
        const match = zodUserSchemaFields.includes(field)
        if (!match) continue

        //
        if (match) {
          setValue(field, value ?? '')
        }
      }
    }
  }, [JSON.stringify(data)])

  //
  const customHandleSubmit = async (values: z.infer<typeof schema>) => {
    const result = schema.safeParse(values)

    //
    if (!result.success) {
      // const mainError = result.error.errors
      // const fieldErrors = result.error.formErrors.fieldErrors
      const errorMessages = result.error.flatten().fieldErrors
      console.log('errorMessages', errorMessages)

      //
      // setError('name', {
      //   type: 'submit',
      //   message: errorMessages.name?.[0] ?? ''
      // })
      // setError('email', {
      //   type: 'submit',
      //   message: errorMessages.email?.[0] ?? ''
      // })
      return
    }

    //
    try {
      if (data) {
        asyncDispatch(updateUser({ ...values, _id: data?._id }))
      } else {
        asyncDispatch(createUser(values))
      }

      //
      dispatch(setDialog(false))
      reset()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  //
  const fields = [
    {
      slug: 'name' as const,
      type: 'text' as const
    },
    {
      slug: 'email' as const,
      type: 'text' as const
    }
  ]

  //
  const contentForm = (
    <Form {...form}>
      <form onSubmit={handleSubmit(customHandleSubmit)}>
        <div className='mt-6 grid w-full items-center gap-4'>
          {fields.map(field => {
            return (
              <CustomFormFields
                key={field.slug}
                form={form}
                name={field.slug}
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
  const title = data ? 'Update User' : 'Create User'
  const description = data ? 'Update user details' : 'Create a new user'

  return (
    <CustomFormDialog
      enableTrigger={false}
      title={title}
      description={description}
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

export default UserForm
