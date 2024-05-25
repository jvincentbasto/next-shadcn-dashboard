import { Column } from '@tanstack/react-table'
import { getColumnSortOrder } from '../../../utilities/sort'
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ListRestart
} from 'lucide-react'
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import { customDropdownMenuItem } from './dropdown'

//
export const enableDropdownSort = true

//
export const getSortOptions = <T,>(column: Column<T, unknown>) => {
  //
  const { isAsc, isDesc, unsorted } = getColumnSortOrder(column)
  const sortCb = () => column.toggleSorting(column.getIsSorted() === 'asc')
  const sortResetCb = () => column.clearSorting()

  //
  const options = [
    {
      cb: sortResetCb,
      icon: (className: string) => <ListRestart className={className} />,
      title: 'Unsort',
      selected: unsorted
    },
    {
      cb: sortCb,
      icon: (className: string) => <ArrowUpNarrowWide className={className} />,
      title: 'Ascend',
      selected: isAsc
    },
    {
      cb: sortCb,
      icon: (className: string) => (
        <ArrowDownWideNarrow className={className} />
      ),
      title: 'Descend',
      selected: isDesc
    }
  ]

  return options
}

//
export const customDropdownSort = <T,>(column: Column<T, unknown>) => {
  const options = getSortOptions(column)

  //
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <ArrowDownUp className='mr-2 h-4 w-4' />
        <span>Sort</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className='min-w-[200px]'>
          {options.map(option => customDropdownMenuItem(option))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
