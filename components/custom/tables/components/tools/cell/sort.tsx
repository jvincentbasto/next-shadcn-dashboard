import { Button } from '@/components/ui/button'
import { Column } from '@tanstack/react-table'
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpNarrowWide
} from 'lucide-react'
import { getColumnSortOrder } from '../../utilities/sort'

//
export const enableCellSort = true

//
export const customCellSort = <T,>(column: Column<T, unknown>) => {
  //
  const { isAsc, isDesc, unsorted } = getColumnSortOrder(column)
  const sortCb = () => {
    const isAsc = column.getIsSorted() === 'asc'
    const isDesc = column.getIsSorted() === 'desc'

    if (isDesc) {
      return column.clearSorting()
    }

    //
    return column.toggleSorting(isAsc)
  }

  //
  return (
    <Button variant='ghost' onClick={sortCb}>
      {isAsc ? <ArrowUpNarrowWide className='h-4 w-4' /> : null}
      {isDesc ? <ArrowDownWideNarrow className='h-4 w-4' /> : null}
      {unsorted ? <ArrowUpDown className='h-4 w-4' /> : null}
    </Button>
  )
}
