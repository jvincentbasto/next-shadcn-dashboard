import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Header } from '@tanstack/react-table'
import { Check, MoreHorizontal } from 'lucide-react'
import React, { CSSProperties } from 'react'
import { customDropdownSearch, enableDropdownSearch } from './search'
import { customDropdownSort, enableDropdownSort } from './sort'
import { customDropdownPin, enableDropdownPin } from './pin'
import { customCellSort, enableCellSort } from '../sort'
import { hasStringMatch } from '@/lib/utilities/string'
import { columnToolId } from '../../column/column'
import { dropdownMenuZIndex } from '../../../utilities/global'

//
export const rowToolId = 'rowTools'

//
type booleanObject = GenerateObjectType<boolean>
export const defaultCellOptions = {
  sort: enableCellSort
}

//
export const enableDropdown = true
export const defaultDropdownOptions = {
  enable: enableDropdown,
  search: enableDropdownSearch,
  sort: enableDropdownSort,
  pin: enableDropdownPin
}

//
export const customDropdownMenuItem = <T,>(data: T) => {
  //
  const { key, cb, icon, title, shortcut, selected } = {
    key: '',
    cb: () => {},
    icon: null as unknown as (
      className?: string,
      styles?: CSSProperties
    ) => JSX.Element,
    title: null,
    shortcut: null,
    selected: false,
    ...data
  }

  //
  return (
    <DropdownMenuItem
      key={key}
      onClick={cb}
      className='flex items-center justify-between'
    >
      <div className='flex items-center'>
        {icon ? icon('mr h-4 w-4') : null}
        {title ? <span className='ml-2'>{title}</span> : null}
      </div>
      <div className='flex items-center'>
        {shortcut ? (
          <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
        ) : null}
        {selected ? <Check size={16} strokeWidth={1} /> : null}
      </div>
    </DropdownMenuItem>
  )
}

//
type CustomCellDropdownProps<T> = {
  header: Header<T, unknown>
  cell?: booleanObject
  dropdown?: booleanObject
}

//
export const CustomCellDropdown = <T,>({
  header,
  cell = defaultCellOptions,
  dropdown = defaultDropdownOptions
}: CustomCellDropdownProps<T>) => {
  //
  const { column } = header
  const { sort: cellSort } = { ...defaultCellOptions, ...cell }
  const {
    enable,
    search,
    sort: dropdownSort,
    pin
  } = { ...defaultDropdownOptions, ...dropdown }

  //
  const isMatchRowToolId = hasStringMatch(column.id, rowToolId)
  const isMatchColumnToolId = hasStringMatch(column.id, columnToolId)

  //
  const isEnableCellSort = cellSort && !isMatchColumnToolId

  //
  const isEnableDropdownSearch =
    search && !isMatchRowToolId && !isMatchColumnToolId
  const isEnableDropdownSort = dropdownSort && !isMatchRowToolId
  const isEnableDropdownPin = pin && !isMatchRowToolId

  //
  const customDropdownTrigger = (
    <DropdownMenuTrigger asChild>
      <Button aria-haspopup='true' size='icon' variant='ghost'>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </DropdownMenuTrigger>
  )

  //
  const dropdownPadding = isEnableDropdownSearch ? '' : 'p-2'
  const customDropdownMenu = (
    <DropdownMenuContent
      align='end'
      className={`relative z-[${dropdownMenuZIndex}] ${dropdownPadding}`}
      style={{ zIndex: dropdownMenuZIndex }}
    >
      {isEnableDropdownSearch ? (
        <>
          <DropdownMenuLabel>{customDropdownSearch(column)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
      ) : null}
      {/*  */}
      <DropdownMenuGroup>
        {isEnableDropdownSort ? customDropdownSort(column) : null}
        {isEnableDropdownPin ? customDropdownPin(column) : null}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )

  //
  return (
    <div className='flex items-center pr-1'>
      {isEnableCellSort ? customCellSort(column) : null}
      {enable ? (
        <DropdownMenu>
          {customDropdownTrigger}
          {customDropdownMenu}
        </DropdownMenu>
      ) : null}
    </div>
  )
}
