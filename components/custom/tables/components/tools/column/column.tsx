import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table'
import {
  customSelectColumnCell,
  customSelectColumnHeader
} from '../column/select'
import { customCellActions } from '../cell/actions'

//
export const columnToolId = 'cellTools'

//
export const customColumnHeaderTools = <T,>(
  headerContext: HeaderContext<T, unknown>
) => {
  const { table } = headerContext

  //
  return customSelectColumnHeader(table)
}

//
export const customColumnCellTools = <T,>(
  cellContext: CellContext<T, unknown>,
  enableActions = true
) => {
  const { row } = cellContext

  //
  return (
    <div className='flex w-full items-center justify-between'>
      {customSelectColumnCell(row)}
      {enableActions ? customCellActions() : null}
    </div>
  )
}

//
export const customColumnTools = <T,>(
  idSuffix = 'First',
  enableActions = true
) => {
  const cellTools: ColumnDef<T> = {
    id: `${columnToolId}${idSuffix}`,
    header: header => customColumnHeaderTools(header),
    cell: cell => customColumnCellTools(cell, enableActions),
    enableSorting: false,
    enableHiding: false,
    minSize: 175,
    maxSize: 250
  }

  //
  return cellTools
}

export const includeCustomColumnTools = <T,>(
  columns: ColumnDef<T>[],
  start = true,
  last = true
) => {
  const list = [...columns]

  //
  if (start) {
    list.unshift(customColumnTools<T>())
  }
  if (last) {
    list.push(customColumnTools<T>('Last'))
  }

  //
  return list
}
