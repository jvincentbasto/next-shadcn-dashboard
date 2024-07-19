import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { FieldValues } from 'react-hook-form'
import { TCustomField, TCustomFieldArray } from '..'

//
export const DynamicCheckBox = <TForm extends FieldValues>({
  properties,
  options,
  form
}: {
  properties: TCustomField
  options: TCustomFieldArray
  form: TForm
}) => {
  const { field } = properties ?? {}

  //
  const { name, primaryType, properties: fieldProperties } = field ?? {}
  const { types } = primaryType ?? {}
  const { type, input } = types ?? {}
  const { label, description } = fieldProperties ?? {}

  //
  const { values = [] } = options

  //
  const matchedType = type === 'array'
  const matchedInput = input === 'checkbox'

  //
  if (!matchedType || !matchedInput) return null

  //
  const valueList = values.map((item, index) => {
    const { value, label } = item

    //
    const setFieldKey = (prefix: string = 'checkbox') =>
      name ? `${name}${index}` : `${prefix}${index}`
    let fieldKey = setFieldKey()
    fieldKey = value ?? fieldKey

    //
    return (
      <FormField
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => {
          //
          return (
            <FormItem
              key={value ?? setFieldKey('checkboxFormItem')}
              id={value ?? setFieldKey('checkboxFormItem')}
              className='flex flex-row items-start space-x-3 space-y-0'
            >
              <FormControl>
                <Checkbox
                  key={fieldKey}
                  id={fieldKey}
                  checked={field.value?.includes(value)}
                  onCheckedChange={checked => {
                    const values = field.value ?? []
                    const list = checked
                      ? [...values, value]
                      : values.filter((val: string) => val !== value)

                    //
                    return field.onChange(list)
                  }}
                />
              </FormControl>
              <FormLabel htmlFor={fieldKey} className='font-normal'>
                {label}
              </FormLabel>
            </FormItem>
          )
        }}
      />
    )
  })

  //
  return (
    <FormItem>
      <div className='mb-4'>
        <FormLabel htmlFor={name ?? 'checkboxForm'}>{label ?? ''}</FormLabel>
        <FormDescription>{description ?? 'Select items'}</FormDescription>
        {valueList}
      </div>
      <FormMessage />
    </FormItem>
  )
}
