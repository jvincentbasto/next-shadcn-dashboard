import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { TCustomField, TCustomFieldArray } from '..'

//
export const DynamicCalendar = ({
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
  const { label, description } = fieldProperties ?? {}

  //
  const { value, onChange, onValueChange } = formField ?? {}

  //
  const defaultOptions = [
    { key: 'today', label: 'Today', value: '0' },
    { key: 'tomorrow', label: 'Tomorrow', value: '1' },
    { key: 'week', label: 'In a week', value: '7' },
    { key: '30days', label: 'In 30 days', value: '30' }
  ]
  const { values = defaultOptions } = options

  //
  const matchedType = type === 'datetime'
  const matchedInput = input === 'calendar'

  //
  if (!matchedType || !matchedInput) return null

  //
  const select = (
    <Select
      onValueChange={value =>
        onValueChange(addDays(new Date(), parseInt(value)))
      }
    >
      <SelectTrigger>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent position='popper'>
        {values.map(item => {
          const { key, value, label } = item

          //
          return (
            <SelectItem key={key} value={value ?? ''}>
              {label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )

  //
  return (
    <FormItem className='flex flex-col'>
      <FormLabel htmlFor={name ?? 'calendarForm'}>{label ?? ''}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {value ? format(value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          {select}
          <div className='rounded-md border'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={onChange}
              disabled={date =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </div>
        </PopoverContent>
      </Popover>
      <FormDescription>{description ?? ''}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
