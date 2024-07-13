import { FormField } from '@/components/ui/form'
import { TFieldDocument } from '@/db/mongodb/utilities'
import React from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import DynamicCustomField from './dynamic'

//
type TProps<TForm extends FieldValues> = {
  [key: string]: any
  form: UseFormReturn<TForm>
  name: Path<TForm>
  field: TFieldDocument
}

// ##########
export const CustomFormFields = <TForm extends FieldValues>({
  form,
  name,
  field
}: TProps<TForm>) => {
  //
  const customFormField = (
    <FormField
      control={form.control}
      name={name}
      render={item => {
        const { field: formField } = item
        const properties = { field, formField }

        //
        const defaultField = DynamicCustomField({
          properties,
          options: field,
          form
        })
        return defaultField ?? <>{name}</>
      }}
    />
  )

  //
  return customFormField
}

export default CustomFormFields
