import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

//
export type TTypeValue =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'enum'
  | 'datetime'
  | 'file'
  | undefined
export type TTypeInput =
  | 'text'
  | 'email'
  | 'number'
  | 'otp'
  | 'switch'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'combobox'
  | 'file'
  | 'calendar'
  | 'password'
  | 'range'
  | 'hidden'
  | undefined
export type TTypeOptions = {
  [key: string]: any
  name?: string
  defaultValue?: any
  error?: string
}
export type TFieldObject = {
  [key: string]: any
  typeValue?: TTypeValue
  typeInput?: TTypeInput
  //
  id?: string | number
  name?: string
  slug?: string
  //
  label?: string
  placeholder?: string
  description?: string
  //
  required?: boolean
  disabled?: boolean
  //
  typeOptions?: TTypeOptions[]
}

//
type TCustomFormFields<TForm extends FieldValues> = {
  form: UseFormReturn<TForm>
  name: Path<TForm>
  options: TFieldObject
}

//
export const CustomFormFields = <TForm extends FieldValues>({
  form,
  name,
  options
}: TCustomFormFields<TForm>) => {
  //
  type TFieldObject = { [key: string]: any }
  const getInputField = (options: TFieldObject) => {
    const { typeValue, typeInput, ...props } = options

    //
    if (typeValue === 'string') {
      //
      if (typeInput === 'text') {
        return (
          <FormItem>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <FormControl>
              <Input
                type='text'
                id={props?.id ?? 'text'}
                placeholder={props?.placeholder ?? ''}
                required={props?.required ?? false}
                disabled={props?.disabled ?? false}
                // defaultValue={props?.defaultValue ?? ''}
                value={props?.value ?? ''}
                onChange={e => {
                  if (props?.onChange) {
                    props.onChange(e.target.value)
                  }
                }}
              />
            </FormControl>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }

      //
      if (typeInput === 'email') {
        return (
          <FormItem>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <FormControl>
              <Input
                type='email'
                id={props?.id ?? 'email'}
                placeholder={props?.placeholder ?? ''}
                required={props?.required ?? false}
                disabled={props?.disabled ?? false}
                // defaultValue={props?.defaultValue ?? ''}
                value={props?.value ?? ''}
                onChange={e => {
                  if (props?.onChange) {
                    props.onChange(e.target.value)
                  }
                }}
              />
            </FormControl>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }

      //
      if (typeInput === 'textarea') {
        return (
          <FormItem>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <FormControl>
              <Textarea
                className='resize-none'
                placeholder={props?.placeholder ?? ''}
                required={props?.required ?? false}
                disabled={props?.disabled ?? false}
                // {...props}
              />
            </FormControl>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }
    }

    //
    if (typeValue === 'number') {
    }

    //
    if (typeValue === 'boolean') {
    }

    //
    if (typeValue === 'boolean') {
      //
      if (typeInput === 'switch') {
        return (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel className='text-base'>{props?.label ?? ''}</FormLabel>
              <FormDescription>{props?.description ?? ''}</FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={props?.value ?? ''}
                onCheckedChange={props?.onChange}
              />
            </FormControl>
          </FormItem>
        )
      }
    }

    //
    if (typeValue === 'array') {
      //
      if (typeInput === 'select') {
        const { groups = [], values = [], className = {} } = props

        //
        const groupList = groups.map((data: any, index: string) => {
          const { values = [], label = null } = data

          //
          const groupLabel = label ? <SelectLabel>{label}</SelectLabel> : null

          //
          const list = values.map((item: any, index: string) => {
            return (
              <SelectItem
                key={item?.key ?? index ?? ''}
                value={item?.value ?? ''}
              >
                {item?.label ?? ''}
              </SelectItem>
            )
          })

          //
          return (
            <SelectContent key={data?.key ?? index ?? ''}>
              {groupLabel}
              {list}
            </SelectContent>
          )
        })

        //
        const valueList = values.map((data: any, index: string) => {
          return (
            <SelectItem
              key={data?.key ?? index ?? ''}
              value={data?.value ?? ''}
            >
              {data?.label ?? ''}
            </SelectItem>
          )
        })

        //
        return (
          <FormItem>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <Select
              defaultValue={props?.defaultValue ?? ''}
              onValueChange={value => {
                if (props?.onValueChange) {
                  props.onValueChange(value)
                }
              }}
            >
              <FormControl>
                <SelectTrigger className={className?.trigger ?? 'w-[280px]'}>
                  <SelectValue
                    placeholder={props?.placeholder ?? 'Select an item'}
                  />
                </SelectTrigger>
              </FormControl>
              {groupList}
              {groupList.length > 0 ? null : valueList}
            </Select>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }

      //
      if (typeInput === 'radio') {
        return (
          <FormItem className='space-y-3'>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <FormControl>
              <RadioGroup
                className='flex flex-col space-y-1'
                defaultValue={props?.defaultValue ?? 'Select an item'}
                onValueChange={value => {
                  if (props?.onValueChange) {
                    props.onValueChange(value)
                  }
                }}
              >
                {props.values.map((data: any, index: string) => {
                  return (
                    <FormItem
                      key={data?.key ?? index ?? ''}
                      className='flex items-center space-x-3 space-y-0'
                    >
                      <FormControl>
                        <RadioGroupItem
                          id={data?.id ?? index ?? ''}
                          value={data?.value ?? ''}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        {data?.label ?? ''}
                      </FormLabel>
                    </FormItem>
                  )
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }

      //
      if (typeInput === 'checkbox') {
        type TValues = {
          [key: string]: any
          id: string
          label: string
          value: string
        }
        const { values = [] } = props

        //
        const list = values.map((item: TValues) => (
          <FormField
            key={item.id}
            control={form.control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem
                  key={item.id}
                  className='flex flex-row items-start space-x-3 space-y-0'
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={checked => {
                        const values = field.value ?? []
                        const list = checked
                          ? [...values, item.id]
                          : values.filter(value => value !== item.id)

                        //
                        return field.onChange(list)
                      }}
                    />
                  </FormControl>
                  <FormLabel className='font-normal'>{item.label}</FormLabel>
                </FormItem>
              )
            }}
          />
        ))

        //
        return (
          <FormItem>
            <div className='mb-4'>
              <FormLabel>{props?.label ?? ''}</FormLabel>
              <FormDescription>
                {props?.description ?? 'Select items'}
              </FormDescription>
              {list}
            </div>
            <FormMessage />
          </FormItem>
        )
      }

      //
      if (typeInput === 'combobox') {
        type TValues = {
          [key: string]: any
          id: string
          label: string
          value: any
        }
        const { value, values = [] } = props

        //
        const currentValue = value
          ? values.find((item: TValues) => item.value === value)?.label
          : 'Select an item'

        //
        const list = values.map((item: TValues) => (
          <CommandItem
            value={item.label}
            key={item.value}
            onSelect={() => {
              form.setValue(name, item.value)
            }}
          >
            <Check
              className={cn(
                'mr-2 h-4 w-4',
                item.value === value ? 'opacity-100' : 'opacity-0'
              )}
            />
            {item.label}
          </CommandItem>
        ))

        //
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>{props?.label ?? ''}</FormLabel>
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
                  <CommandInput
                    placeholder={props?.placeholder ?? 'Select an item'}
                  />
                  <CommandEmpty>
                    {props?.empty ?? 'No language found'}
                  </CommandEmpty>
                  <CommandGroup>{list}</CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }
    }

    //
    if (typeValue === 'file') {
      //
      if (typeInput === 'file') {
        return (
          <FormItem>
            <FormLabel>{props?.label ?? ''}</FormLabel>
            <FormControl>
              <Input
                id={props?.id ?? 'file'}
                type='file'
                placeholder={props?.placeholder ?? ''}
                required={props?.required ?? false}
                disabled={props?.disabled ?? false}
                // defaultValue={props?.defaultValue ?? ''}
                value={props?.value ?? undefined}
                onChange={e => {
                  if (props?.onChange) {
                    props.onChange(e.target.value)
                  }
                }}
              />
            </FormControl>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }
    }
    //
    if (typeValue === 'datetime') {
      //
      if (typeInput === 'calendar') {
        type TValues = {
          [key: string]: any
          id: string
          label: string
          value: string
        }
        const defaultOptions = [
          { id: 'today', label: 'Today', value: 0 },
          { id: 'tomorrow', label: 'Tomorrow', value: 1 },
          { id: 'week', label: 'In a week', value: 7 },
          { id: '30days', label: 'In 30 days', value: 30 }
        ]

        //
        const { value, values = defaultOptions } = props

        //
        const select = (
          <Select
            onValueChange={value =>
              props?.onChange(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent position='popper'>
              {values.map((item: TValues) => (
                <SelectItem key={item.id} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

        //
        return (
          <FormItem className='flex flex-col'>
            <FormLabel>{props?.label ?? ''}</FormLabel>
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
                    onSelect={props?.onChange}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </div>
              </PopoverContent>
            </Popover>
            <FormDescription>{props?.description ?? ''}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }
    }
  }

  //
  const customFormField = (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const defaultField = getInputField({
          ...options,
          ...field,
          value: field.value,
          onChange: field.onChange
        })

        //
        return defaultField ?? <>{name}</>
      }}
    />
  )

  //
  return customFormField
}

export default CustomFormFields
