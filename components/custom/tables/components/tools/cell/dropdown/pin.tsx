import { Column } from '@tanstack/react-table'
import { Pin, PinOff, TableProperties } from 'lucide-react'
import { getColumnPositions } from '../../../utilities/column'
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import { customDropdownMenuItem } from './dropdown'
import { dropdownSubMenuZIndex } from '../../../utilities/global'

//
export const enableDropdownPin = true

//
export const getPinOptions = <T,>(column: Column<T, unknown>) => {
  //
  const isPinned = column.getIsPinned()
  const { isCenter, isLeft, isRight } = getColumnPositions(isPinned)

  //
  const unpin = () => column.pin(false)
  const pinLeft = () => column.pin('left')
  const pinRight = () => column.pin('right')

  //
  const pinOptions = [
    {
      key: 'unpin',
      cb: unpin,
      icon: (className: string) => <PinOff className={className} />,
      title: 'Unpin',
      selected: isCenter
    },
    {
      key: 'pin-left',
      cb: pinLeft,
      icon: (className: string) => (
        <TableProperties
          className={className}
          style={{ transform: 'rotateY(180deg)' }}
        />
      ),
      title: 'Pin Left',
      selected: isLeft
    },
    {
      key: 'pin-right',
      cb: pinRight,
      icon: (className: string) => <TableProperties className={className} />,
      title: 'Pin Right',
      selected: isRight
    }
  ]

  //
  return pinOptions
}

//
export const customDropdownPin = <T,>(column: Column<T, unknown>) => {
  const pinOptions = getPinOptions(column)

  //
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Pin className='mr-2 h-4 w-4' />
        <span>Pin</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent
          className='min-w-[200px]'
          style={{ zIndex: dropdownSubMenuZIndex }}
        >
          {pinOptions.map(option => customDropdownMenuItem(option))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
