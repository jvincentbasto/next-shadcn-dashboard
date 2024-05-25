import { Column } from '@tanstack/react-table'

//
// ##############################
// * ########## Get Column Positions
// ##############################
export const getColumnSortOrder: <TData>(column: Column<TData, unknown>) => {
  isAsc: boolean
  isDesc: boolean
  unsorted: boolean
} = column => {
  const currentSort = column.getIsSorted()

  //
  const isAsc = currentSort === 'asc'
  const isDesc = currentSort === 'desc'
  const unsorted = currentSort === false

  return { isAsc, isDesc, unsorted }
}
