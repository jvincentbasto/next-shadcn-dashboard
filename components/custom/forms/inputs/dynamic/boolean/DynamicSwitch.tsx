import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TCustomField } from '..'

//
export const DynamicSwitch = ({ properties }: { properties: TCustomField }) => {
  const { field, formField } = properties ?? {}

  //
  const { name, primaryType, properties: fieldProperties } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}
  const { label, description } = fieldProperties ?? {}

  //
  const { value, onChange } = formField ?? {}

  //
  const matchedType = type === 'boolean'
  const matchedInput = input === 'otp'

  //
  if (!matchedType || !matchedInput) return null

  //
  return (
    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
      <div className='space-y-0.5'>
        <FormLabel htmlFor={name ?? 'switchId'} className='text-base'>
          {label ?? ''}
        </FormLabel>
        <FormDescription>{description ?? ''}</FormDescription>
      </div>
      <FormControl>
        <Switch
          id={name ?? 'switchId'}
          name={name ?? 'switchName'}
          checked={value ?? false}
          onCheckedChange={onChange}
          {...formField}
        />
      </FormControl>
    </FormItem>
  )
}
