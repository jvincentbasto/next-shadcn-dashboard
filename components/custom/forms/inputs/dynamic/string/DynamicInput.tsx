import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { TCustomField } from '..'
import { Input } from '@/components/ui/input'

//
export const DynamicInput = ({ properties }: { properties: TCustomField }) => {
  const { field, formField } = properties ?? {}

  //
  const { name, primaryType, properties: fieldProperties } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}
  const { label, placeholder, description, required, disabled, autoComplete } =
    fieldProperties ?? {}

  //
  const matchedType = type === 'string'
  const matchedInput = input === 'text'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem>
      <FormLabel htmlFor={name ?? 'textId'}>{label ?? ''}</FormLabel>
      <FormControl>
        <Input
          type='text'
          id={name ?? 'textId'}
          name={name ?? 'textName'}
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
