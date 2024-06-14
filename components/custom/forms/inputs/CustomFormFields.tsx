import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

//
type TCustomFormFields<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
}

//
export const CustomFormFields = <TForm extends FieldValues>({
  form,
  name
}: TCustomFormFields<TForm>) => {
  const customField = (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Input
              placeholder={field.name}
              value={field.value}
              onChange={e => {
                field.onChange(e.target.value)
              }}
            />
          </FormControl>
          <FormDescription>{field.name}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )

  //
  return customField
}

export default CustomFormFields
