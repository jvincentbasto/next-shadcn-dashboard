import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TCustomField } from '..'

//
export const DynamicEmail = ({ properties }: { properties: TCustomField }) => {
  const { field, formField } = properties

  //
  const { name, types, properties: fieldProperties } = field
  const { type, input } = types
  const { label, placeholder, description, required, disabled, autoComplete } =
    fieldProperties ?? {}

  //
  const matchedType = type === 'string'
  const matchedInput = input === 'email'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem>
      <FormLabel htmlFor={name ?? 'emailId'}>{label ?? ''}</FormLabel>
      <FormControl>
        <Input
          type='email'
          id={name ?? 'emailId'}
          name={name ?? 'emailName'}
          placeholder={placeholder ?? ''}
          required={required ?? false}
          disabled={disabled ?? false}
          autoComplete={autoComplete ?? 'off'}
          {...formField}
        />
      </FormControl>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
