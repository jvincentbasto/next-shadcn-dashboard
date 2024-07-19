import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { TCustomField, TCustomFieldArray } from '..'

//
export const DynamicSelect = ({
  properties,
  options
}: {
  properties: TCustomField
  options: TCustomFieldArray
}) => {
  const { field, formField } = properties ?? {}

  //
  const { name, primaryType, properties: fieldProperties } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}
  const { label, description, placeholder } = fieldProperties ?? {}

  //
  const { value, onValueChange } = formField ?? {}

  //
  const { groups = [], values = [], className = {} } = options

  //
  const matchedType = type === 'array'
  const matchedInput = input === 'select'

  //
  if (!matchedType || !matchedInput) return null

  //
  const groupList = groups.map((item, index) => {
    const { key, values = [], label } = item

    //
    const groupLabel = label ? <SelectLabel>{label ?? ''}</SelectLabel> : null

    //
    const list = values.map((item, index) => {
      const { key, value, label } = item

      //
      return (
        <SelectItem key={key ?? index ?? ''} value={value ?? ''}>
          {label ?? ''}
        </SelectItem>
      )
    })

    //
    return (
      <SelectContent key={key ?? index ?? ''}>
        {groupLabel}
        {list}
      </SelectContent>
    )
  })

  //
  const valueList = values.map((item, index) => {
    const { key, value, label } = item

    //
    return (
      <SelectItem key={key ?? index ?? ''} value={value ?? ''}>
        {label ?? ''}
      </SelectItem>
    )
  })

  //
  return (
    <FormItem>
      <FormLabel htmlFor={name ?? 'selectForm'}>{label ?? ''}</FormLabel>
      <Select
        value={value ?? 'Select an item'}
        onValueChange={value => {
          if (onValueChange) {
            onValueChange(value)
          }
        }}
        {...formField}
      >
        <FormControl>
          <SelectTrigger className={className?.trigger ?? 'w-[280px]'}>
            <SelectValue placeholder={placeholder ?? 'Select an item'} />
          </SelectTrigger>
        </FormControl>
        {groupList.length > 0 ? groupList : valueList}
      </Select>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
