import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { FieldValues } from 'react-hook-form'
import { TCustomField, TCustomFieldArray } from '..'

//
export const DynamicComboBox = <TForm extends FieldValues>({
  properties,
  options,
  form
}: {
  properties: TCustomField
  options: TCustomFieldArray
  form: TForm
}) => {
  const { field } = properties

  //
  const { name, types, properties: fieldProperties } = field
  const { type, input } = types
  const { label, description, placeholder, empty } = fieldProperties ?? {}

  //
  const { value, values = [] } = options

  //
  const matchedType = type === 'array'
  const matchedInput = input === 'combobox'

  //
  if (!matchedType || !matchedInput) return null

  //
  const currentValue = value
    ? values.find(item => item.value === value)?.label
    : 'Select an item'

  //
  const valueList = values.map((item, index) => {
    const { value: itemValue, label } = item

    //
    const setFieldKey = (prefix: string = 'combobox') =>
      name ? `${name}${index}` : `${prefix}${index}`
    let fieldKey = setFieldKey()
    fieldKey = value ?? fieldKey

    //
    return (
      <CommandItem
        key={fieldKey}
        id={fieldKey}
        value={value}
        onSelect={() => {
          form.setValue(name, itemValue)
        }}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            itemValue === value ? 'opacity-100' : 'opacity-0'
          )}
        />
        {label}
      </CommandItem>
    )
  })

  //
  return (
    <FormItem className='flex flex-col'>
      <FormLabel htmlFor={name ?? 'comboboxForm'}>{label ?? ''}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              className={cn(
                'w-[200px] justify-between',
                !value && 'text-muted-foreground'
              )}
            >
              {currentValue}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder={placeholder ?? 'Select an item'} />
            <CommandEmpty>{empty ?? 'No language found'}</CommandEmpty>
            <CommandGroup>{valueList}</CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
