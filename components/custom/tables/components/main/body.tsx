import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  Cell,
  ColumnDef,
  ColumnPinningPosition,
  Row,
  Table
} from '@tanstack/react-table'
import { customColumnBoxShadow } from '../layout/box-shadow'
import { getColumnPositions } from '../utilities/column'
import { customTableCell } from '../parts/cells'

//
export const emptyTableRows = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  className: string = ''
) => {
  //
  return (
    <TableBody className={cn('h-[200px]', className)}>
      <TableRow className='flex min-h-full items-center justify-center'>
        <TableCell colSpan={columns.length} className='mb-[10px] text-center'>
          No Results
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

//
export const setCustomVisibleCells = <TData,>(
  cells: Cell<TData, unknown>[] = []
) => {
  //
  return cells.map(cell => {
    return customTableCell(cell)
  })
}

//
export const customTableBodyColumn = <T,>(
  table: Table<T>,
  position: ColumnPinningPosition = false
) => {
  const rows = table.getRowModel().rows

  //
  const getVisibileCells = (row: Row<T>) => {
    const { isLeft, isRight } = getColumnPositions(position)
    let cells = row.getCenterVisibleCells() || []

    //
    if (isLeft) {
      cells = row.getLeftVisibleCells()
    }
    if (isRight) {
      const right = row.getRightVisibleCells()
      cells = [...right].reverse()
    }

    return cells
  }

  //
  const list = rows
    .filter(row => {
      const cells = getVisibileCells(row)
      return cells.length > 0
    })
    .map(row => {
      const cells = getVisibileCells(row)

      return (
        <TableRow key={row.id} className='border-0'>
          {setCustomVisibleCells(cells)}
        </TableRow>
      )
    })

  //
  return customColumnBoxShadow(position, list)
}

//
export const customTableBody = <T, CData, CValue>(
  table: Table<T>,
  columns: ColumnDef<CData, CValue>[],
  className: string = ''
) => {
  return table.getRowModel().rows.length > 0 ? (
    <TableBody className={cn('relative flex min-h-full', className)}>
      {customTableBodyColumn(table, 'left')}
      {customTableBodyColumn(table)}
      {customTableBodyColumn(table, 'right')}
    </TableBody>
  ) : (
    emptyTableRows(columns)
  )
}
