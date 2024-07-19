import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table'
import {
  customSelectColumnCell,
  customSelectColumnHeader
} from '../column/select'
import { customCellActions } from '../cell/actions'
import { TFieldDocument } from '@/db/mongodb/utilities'

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
  enableActions = true,
  updateCb?: (arg: any, ...args: any[]) => void,
  deleteCb?: (arg: any, ...args: any[]) => void
) => {
  const { row } = cellContext

  //
  return (
    <div className='flex w-full items-center justify-between'>
      {customSelectColumnCell(row)}
      {enableActions
        ? customCellActions(cellContext, updateCb, deleteCb)
        : null}
    </div>
  )
}

//
export const customColumnTools = <T,>(
  idSuffix = 'First',
  enableActions = true,
  updateCb?: (arg: any, ...args: any[]) => void,
  deleteCb?: (arg: any, ...args: any[]) => void
) => {
  const cellTools: ColumnDef<T> = {
    id: `${columnToolId}${idSuffix}`,
    header: header => customColumnHeaderTools(header),
    cell: cell =>
      customColumnCellTools(cell, enableActions, updateCb, deleteCb),
    enableSorting: false,
    enableHiding: false,
    minSize: 175,
    maxSize: 250
  }

  //
  return cellTools
}

//
export const includeCustomColumnTools = <T,>(
  columns: ColumnDef<T>[],
  start = true,
  last = false,
  actions: {
    [key: string]: any
    updateCb?: (arg: any, ...args: any[]) => void
    deleteCb?: (arg: any, ...args: any[]) => void
  }
) => {
  const { updateCb, deleteCb } = actions
  const list = [...columns]

  //
  if (start) {
    list.unshift(customColumnTools<T>('First', true, updateCb, deleteCb))
  }
  if (last) {
    list.push(customColumnTools<T>('Last', true, updateCb, deleteCb))
  }

  //
  return list
}

//
export const getTableColumnsBySchema = (fields: TFieldDocument[]) => {
  type TColumnDef = {
    [key: string]: any
  }

  //
  const columns: ColumnDef<TColumnDef>[] = fields.map(field => {
    const { id: fieldId, name, slug, properties } = field ?? {}
    const { label, sizes } = properties ?? {}
    const { table = {} } = sizes ?? {}

    //
    let id = name ?? slug ?? fieldId ?? ''
    id = id.toString().toLowerCase().replace(/ /g, '_')

    //
    let column: ColumnDef<TColumnDef> = {
      accessorKey: id,
      id: id,
      header: label
    }

    //
    if (table.minSize) {
      column.minSize = table.minSize
    }
    if (table.maxSize) {
      column.maxSize = table.maxSize
    }

    //
    return column
  })

  //
  return columns
}
