import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table'
import {
  customSelectColumnCell,
  customSelectColumnHeader
} from '../column/select'
import { customCellActions } from '../cell/actions'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'

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
  updateCb?: (arg: any, ...args: any[]) => void,
  deleteCb?: (arg: any, ...args: any[]) => void
) => {
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
export const getTableColumnsBySchema = (fields: TFieldObject[]) => {
  type TColumnDef = {
    [key: string]: any
  }

  //
  const columns: ColumnDef<TColumnDef>[] = fields.map(field => {
    let id = field.name ?? field.slug ?? field.id ?? field.label ?? ''
    id = id.toString().toLowerCase().replace(/ /g, '_')

    //
    let column: ColumnDef<TColumnDef> = {
      accessorKey: id,
      id: id,
      header: field.label
    }

    //
    if (field?.minSize) {
      column.minSize = field.minSize
    }
    if (field?.maxSize) {
      column.maxSize = field.maxSize
    }

    //
    return column
  })

  //
  return columns
}
