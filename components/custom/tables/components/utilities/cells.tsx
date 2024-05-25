import { Cell, Column, Header, HeaderGroup, Table } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { getColumnPositions } from './column'
import {
  ColumnSeparatorType,
  getColumnSeparatorType,
  getColumnSeparatorWidth
} from './separator'

//
// ##############################
// * ########## Types
// ##############################
//
type NumberCompareConditions = 'gt' | 'lt' | 'gte' | 'lte' | 'eq'

//
type ObjectsOfStyles = { [key: string]: CSSProperties }
type ColumnStyles = {
  [key: string]: CSSProperties | ObjectsOfStyles
  tableCell: ObjectsOfStyles
}

//
type TableColumnWidths = {
  size?: number
  minSize?: number
  maxSize?: number
}

//
// ##############################
// * ########## Constants
// ##############################
//
const defaultColumnWidths = {
  size: 250,
  minSize: 200,
  maxSize: 300
}

//
// ##############################
// * ########## Get Computed Column Widths
// ##############################
//
export const getComputedColumnWidth: <TData>(
  column: Column<TData, unknown>,
  widths?: TableColumnWidths
) => number = (column, widths) => {
  const { minSize, maxSize } = { ...defaultColumnWidths, ...widths }

  // ####################
  const columnSize = column.getSize()
  const isDefaultMaxSize =
    column.columnDef.maxSize !== undefined && column.columnDef.maxSize > 10000

  // ####################
  let columnMinSize = column.columnDef.minSize ?? columnSize
  let columnMaxSize = isDefaultMaxSize ? maxSize : columnSize
  if (columnMinSize <= columnSize) columnMinSize = minSize

  // ####################
  let width = columnSize < columnMinSize ? columnMinSize : columnSize
  if (width > columnMaxSize) width = columnMaxSize

  //
  return width
}

export const getComputedTotalColumnWidth = <TData,>(
  columns: Column<TData, unknown>[] = [],
  widths?: TableColumnWidths
) => {
  //
  return columns.reduce((acc, column) => {
    let width = getComputedColumnWidth(column, widths)
    return acc + width
  }, 0)
}

//
// ##############################
// * ########## Computed Cell Positions
// ##############################
//
export const filterHeaderGroupByIndex = <TData,>(
  headerGroup: HeaderGroup<TData>[] = [],
  index: number,
  condition: NumberCompareConditions = 'eq'
) => {
  //
  const isIndexConditionMatch = (
    current: number,
    compare: number,
    condition: NumberCompareConditions = 'eq'
  ) => {
    // ####################
    if (condition === 'gt') {
      return compare > current
    }
    if (condition === 'lt') {
      return compare < current
    }

    // ####################
    if (condition === 'gte') {
      return compare >= current
    }
    if (condition === 'lte') {
      return compare <= current
    }

    // ####################
    return current === compare
  }

  // ####################
  return headerGroup.map(group => {
    return group.headers.filter(header => {
      return isIndexConditionMatch(header.index, index, condition)
    })
  })
}

//
export const computeCellPositions = <TData,>(
  table: Table<TData>,
  column: Column<TData, unknown>,
  widths: TableColumnWidths = {}
) => {
  const isPinned = column.getIsPinned()
  const index = column.getIndex(isPinned || 'center')
  const { isLeft, isRight } = getColumnPositions(isPinned)

  // ####################
  const leftHeaderGroups = table.getLeftHeaderGroups()
  const rightHeaderGroups = table.getRightHeaderGroups()

  // ####################
  const filteredLeftHeaderGroups = filterHeaderGroupByIndex(
    leftHeaderGroups,
    index,
    'gt'
  )
  const filteredLRightHeaderGroups = filterHeaderGroupByIndex(
    rightHeaderGroups,
    index,
    'gt'
  )

  // ####################
  const leftColumns = filteredLeftHeaderGroups
    .flat()
    .map(header => header.column)
  const rightColumns = filteredLRightHeaderGroups
    .flat()
    .map(header => header.column)

  // ####################
  let left = column.getStart('left')
  let right = column.getStart('right')

  //
  if (isLeft) {
    left = getComputedTotalColumnWidth(leftColumns, widths)
  }
  if (isRight) {
    right = getComputedTotalColumnWidth(rightColumns, widths)
  }

  if (isLeft) {
    console.log('after', column.id, leftColumns, left)
  }

  //
  return {
    left,
    right,
    leftColumns,
    rightColumns
  }
}

//
export const getComputedCellPositions = <TData,>(
  table: Table<TData>,
  column: Column<TData, unknown>,
  widths: TableColumnWidths = {}
) => {
  const width = getComputedColumnWidth(column, widths)
  const { left, right } = computeCellPositions(table, column, widths)

  //
  return {
    width,
    left,
    right
  }
}

//
// ##############################
// * ########## Get Cell Styles
// ##############################
//
export const getCellStyles = <TData,>(
  column: Column<TData, unknown>,
  mode: 'header' | 'cell' = 'header',
  widths: {
    width: number
    left?: number
    right?: number
  },
  cellZIndex: number = 1,
  separator?: ColumnSeparatorType
): ColumnStyles => {
  const { width, left, right } = widths

  //
  const isPinned = column.getIsPinned()
  const { isLeft, isRight } = getColumnPositions(isPinned)

  //
  const { isDisable } = getColumnSeparatorType(separator)
  const cellPaddingRight = getColumnSeparatorWidth(separator)

  // ####################
  const background = isPinned ? 'white' : undefined
  const position = isPinned ? 'sticky' : 'relative'
  const zIndex = isPinned ? cellZIndex : 0

  //
  const leftPosition = isLeft && left ? `${left}px` : undefined
  const rightPosition = isRight && right ? `${right}px` : undefined

  // ####################
  const cellPositions: CSSProperties = {
    width,
    left: leftPosition,
    right: rightPosition
  }
  const defaultPositions: CSSProperties = {
    //
    background,
    position,
    zIndex,
    //
    ...cellPositions
  }

  // ####################
  const cellHeaderStyles: CSSProperties = {
    ...defaultPositions
  }
  const cellCellStyles: CSSProperties = {
    ...defaultPositions,
    paddingRight: !isDisable ? cellPaddingRight : undefined
  }

  // ####################
  const header = {
    cell: cellHeaderStyles
  }
  const cell = {
    cell: cellCellStyles
  }

  //
  const styles = {
    tableCell: mode === 'header' ? header : cell
  }

  return styles
}

//
export const getCellClassNames = <TData,>(column: Column<TData, unknown>) => {
  //
  return ''
}

//
export const getCellZIndex = <TData,>(
  table: Table<TData>,
  column: Column<TData, unknown>
) => {
  //
  const isPinned = column.getIsPinned()
  const index = column.getIndex(isPinned || 'center')

  // ####################
  const leftHeaderGroups = table
    .getLeftHeaderGroups()
    .map(group => group.headers)
  const rightHeaderGroups = table
    .getRightHeaderGroups()
    .map(group => group.headers)

  // ####################
  const leftColumns = leftHeaderGroups.flat().map(header => header.column)
  const rightColumns = rightHeaderGroups.flat().map(header => header.column)

  //
  const leftZIndex = leftColumns.length - 1 - index
  const rightZIndex = rightColumns.length - 1 - index

  //
  return isPinned === 'left' ? leftZIndex : rightZIndex
}

//
// ##############################
// * ########## Get Table Cell Styles
// ##############################
//

export const getTableHeaderStyles = <TData,>(
  header: Header<TData, unknown>,
  widths: TableColumnWidths = {},
  separator?: ColumnSeparatorType
) => {
  const { column } = header

  //
  const table = header.getContext().table
  const computedwidths = getComputedCellPositions(table, column, widths)
  const cellZIndex = getCellZIndex(table, column)

  //
  const className = getCellClassNames(column)
  const styles = getCellStyles(
    column,
    'header',
    computedwidths,
    cellZIndex,
    separator
  )

  //
  return {
    className,
    styles
  }
}

//
export const getTableDataCellStyles = <TData,>(
  cell: Cell<TData, unknown>,
  widths: TableColumnWidths = {},
  separator?: ColumnSeparatorType
) => {
  const { column } = cell

  //
  const table = cell.getContext().table
  const computedwidths = getComputedCellPositions(table, column, widths)
  const cellZIndex = getCellZIndex(table, column)

  //
  const className = getCellClassNames(column)
  const styles = getCellStyles(
    column,
    'cell',
    computedwidths,
    cellZIndex,
    separator
  )

  //
  return {
    className,
    styles
  }
}

//
export const getTableCellStyles = <TData,>(
  document: Header<TData, unknown> | Cell<TData, unknown>,
  mode: 'header' | 'cell' = 'header',
  widths: TableColumnWidths = {},
  separator?: ColumnSeparatorType
) => {
  //
  if (mode === 'cell') {
    return getTableDataCellStyles(
      document as Cell<unknown, unknown>,
      widths,
      separator
    )
  }

  return getTableHeaderStyles(
    document as Header<unknown, unknown>,
    widths,
    separator
  )
}
