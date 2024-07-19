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
export const DynamicFile = ({ properties }: { properties: TCustomField }) => {
  const { field, formField } = properties ?? {}

  //
  const { name, primaryType, properties: fieldProperties } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}
  const { label, placeholder, description, required, disabled } =
    fieldProperties ?? {}

  //
  const matchedType = type === 'file'
  const matchedInput = input === 'file'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem>
      <FormLabel htmlFor={name ?? 'fileForm'}>{label ?? ''}</FormLabel>
      <FormControl>
        <Input
          key={name ?? 'file'}
          type='file'
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
