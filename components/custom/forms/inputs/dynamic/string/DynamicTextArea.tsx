import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { TCustomField } from '..'
import { Textarea } from '@/components/ui/textarea'

//
export const DynamicTextArea = ({
  properties
}: {
  properties: TCustomField
}) => {
  const { field, formField } = properties

  //
  const { name, types, properties: fieldProperties } = field
  const { type, input } = types
  const { label, placeholder, description, required, disabled } =
    fieldProperties ?? {}

  //
  const matchedType = type === 'string'
  const matchedInput = input === 'textarea'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem>
      <FormLabel htmlFor={name ?? 'textareaId'}>{label ?? ''}</FormLabel>
      <FormControl>
        <Textarea
          className='resize-none'
          id={name ?? 'textareaId'}
          name={name ?? 'textareaName'}
          placeholder={placeholder ?? ''}
          required={required ?? false}
          disabled={disabled ?? false}
          {...formField}
        />
      </FormControl>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
