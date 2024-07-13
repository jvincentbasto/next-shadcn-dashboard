import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TCustomField, TCustomFieldArray } from '..'

//
export const DynamicRadio = ({
  properties,
  options
}: {
  properties: TCustomField
  options: TCustomFieldArray
}) => {
  const { field, formField } = properties

  //
  const { name, types, properties: fieldProperties } = field
  const { type, input } = types
  const { label } = fieldProperties ?? {}

  //
  const { value, onValueChange } = formField ?? {}

  //
  const { values = [] } = options

  //
  const matchedType = type === 'array'
  const matchedInput = input === 'radio'

  //
  if (!matchedType || !matchedInput) return null

  //
  const valueList = values.map((item, index) => {
    const { value, label } = item

    //
    const setFieldKey = (prefix: string = 'radio') =>
      name ? `${name}${index}` : `${prefix}${index}`
    let fieldKey = setFieldKey()
    fieldKey = value ?? fieldKey

    //
    return (
      <FormItem
        key={value ?? setFieldKey('radioForm')}
        id={value ?? setFieldKey('radioForm')}
        className='flex items-center space-x-3 space-y-0'
      >
        <FormControl>
          <RadioGroupItem key={fieldKey} id={fieldKey} value={value ?? ''} />
        </FormControl>
        <FormLabel htmlFor={fieldKey} className='font-normal'>
          {label ?? ''}
        </FormLabel>
      </FormItem>
    )
  })

  //
  return (
    <FormItem className='space-y-3'>
      <FormLabel htmlFor={name ?? 'radioId'}>{label ?? ''}</FormLabel>
      <FormControl>
        <RadioGroup
          id={name ?? 'radioId'}
          name={name ?? 'radioName'}
          className='flex flex-col space-y-1'
          value={value ?? 'Select an item'}
          onValueChange={value => {
            if (onValueChange) {
              onValueChange(value)
            }
          }}
        >
          {valueList}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
