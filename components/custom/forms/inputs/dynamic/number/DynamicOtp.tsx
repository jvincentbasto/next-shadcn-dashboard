import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { TCustomField } from '..'

//
export const DynamicOtp = ({ properties }: { properties: TCustomField }) => {
  const { field, formField } = properties

  //
  const { name, types, properties: fieldProperties } = field
  const { type, input } = types
  const { label, placeholder, description, required, disabled, autoComplete } =
    fieldProperties ?? {}

  //
  const matchedType = type === 'number'
  const matchedInput = input === 'otp'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem>
      <FormLabel htmlFor={label ?? 'numberId'}>{label ?? ''}</FormLabel>
      <FormControl>{}</FormControl>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
