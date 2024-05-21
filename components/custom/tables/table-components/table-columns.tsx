import {
  Cell,
  Column,
  ColumnPinningPosition,
  Header,
  RowPinningPosition,
  Table
} from '@tanstack/react-table'
import { FoldHorizontal } from 'lucide-react'
import { CSSProperties } from 'react'

//
// ##############################
// * ########## Types
// ##############################
//
type ColumnStyles = {
  all: CSSProperties
  column: CSSProperties
  boxShadow: CSSProperties
  resizer: CSSProperties
}
type ComputedColumnStyles = {
  styles: ColumnStyles
  className: string
}
type ComputedColumnPinningPositions = {
  left?: number
  right?: number
  width: number
}
type ComputedColumnWidths = {
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
// * ########## Get Computed COlumn Widths
// ##############################
//
export const getComputedColumnWidth: <TData>(
  column: Column<TData, unknown>,
  widths?: ComputedColumnWidths
) => number = (column, widths) => {
  const { minSize, maxSize } = { ...defaultColumnWidths, ...widths }

  //
  const columnSize = column.getSize()
  const isDefaultMaxSize =
    column.columnDef.maxSize !== undefined && column.columnDef.maxSize > 10000

  let columnMinSize = column.columnDef.minSize ?? columnSize
  let columnMaxSize = isDefaultMaxSize ? maxSize : columnSize

  //
  if (columnMinSize <= columnSize) columnMinSize = minSize

  let width = columnSize < columnMinSize ? columnMinSize : columnSize
  if (width > columnMaxSize) width = columnMaxSize

  return width
}

//
export const getComputedColumnTotalWidth: <TData>(
  table: Table<TData>
) => number = table => {
  const totalSize = table.getAllColumns().reduce((acc, column) => {
    let width = getComputedColumnWidth(column)

    return acc + width
  }, 0)

  return totalSize
}

//
// ##############################
// * ########## Get Column Positions
// ##############################
//
export const getColumnPositions: (isPinned: ColumnPinningPosition) => {
  isLeft: boolean
  isRight: boolean
  isCenter: boolean
} = isPinned => {
  const isLeft = isPinned === 'left'
  const isRight = isPinned === 'right'
  const isCenter = isPinned === false
  // const index = column.getIndex(isPinned || 'center')

  return { isLeft, isRight, isCenter }
}

//
export const getRowPositions: (isPinned: RowPinningPosition) => {
  isTop: boolean
  isBottom: boolean
  isCenter: boolean
} = isPinned => {
  const isTop = isPinned === 'top'
  const isBottom = isPinned === 'bottom'
  const isCenter = isPinned === false

  return { isTop, isBottom, isCenter }
}

//
// ##############################
// * ########## Get Pinned Column Positions
// ##############################
//
export const getLeftColumnPositions: <TData>(
  column: Column<TData, unknown>
) => {
  isLeftFirstColumn: boolean
  isLeftLastColumn: boolean
  isLeftCenterColumn: boolean
} = column => {
  const isPinned = column.getIsPinned()
  const { isLeft } = getColumnPositions(isPinned)

  //
  const isLeftFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isLeft
  const isLeftLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isLeft
  const isLeftCenterColumn = !isLeftFirstColumn && !isLeftLastColumn && isLeft

  return {
    isLeftFirstColumn,
    isLeftLastColumn,
    isLeftCenterColumn
  }
}

//
export const getRightColumnPositions: <TData>(
  column: Column<TData, unknown>
) => {
  isRightFirstColumn: boolean
  isRightLastColumn: boolean
  isRightCenterColumn: boolean
} = column => {
  const isPinned = column.getIsPinned()
  const { isRight } = getColumnPositions(isPinned)

  //
  const isRightFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isRight
  const isRightLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isRight
  const isRightCenterColumn =
    !isRightFirstColumn && !isRightLastColumn && isRight

  return {
    isRightFirstColumn,
    isRightLastColumn,
    isRightCenterColumn
  }
}

//
export const getCenterColumnPositions: <TData>(
  column: Column<TData, unknown>
) => {
  isCenterFirstColumn: boolean
  isCenterLastColumn: boolean
  isCenterCenterColumn: boolean
} = column => {
  const isPinned = column.getIsPinned()
  const { isCenter } = getColumnPositions(isPinned)

  //
  const isCenterFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isCenter
  const isCenterLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isCenter
  const isCenterCenterColumn =
    !isCenterFirstColumn && !isCenterLastColumn && isCenter

  return {
    isCenterFirstColumn,
    isCenterLastColumn,
    isCenterCenterColumn
  }
}

//
// ##############################
// * ########## Compute Column Pinning Positions
// ##############################
//
export const computeHeaderPinningPositions: <TData>(
  column: Column<TData, unknown>,
  table: Table<TData>,
  widths?: ComputedColumnWidths
) => {
  left: number
  right: number
  leftColumns: Column<TData, unknown>[]
  rightColumns: Column<TData, unknown>[]
} = (column, table, widths = {}) => {
  //
  const isPinned = column.getIsPinned()
  const index = column.getIndex(isPinned || 'center')

  //
  const leftHeaderGroups = table.getLeftHeaderGroups().map(group => {
    return group.headers.filter(header => {
      return header.index < index
    })
  })
  const rightHeaderGroups = table.getRightHeaderGroups().map(group => {
    return group.headers.filter(header => {
      return header.index < index
    })
  })

  //
  const leftColumns = leftHeaderGroups.flat().map(header => header.column)
  const rightColumns = rightHeaderGroups.flat().map(header => header.column)

  //
  const totalLeftPinnedSize = leftColumns.reduce((acc, column) => {
    let width = getComputedColumnWidth(column, widths)

    //
    return acc + width
  }, 0)
  const totalRightPinnedSize = rightColumns.reduce((acc, column) => {
    let width = getComputedColumnWidth(column, widths)

    //
    return acc + width
  }, 0)

  //
  let left = column.getStart('left')
  if (isPinned === 'left') {
    left = totalLeftPinnedSize
  }

  //
  let right = column.getStart('right')
  if (isPinned === 'right') {
    right = totalRightPinnedSize
  }

  return {
    left,
    right,
    leftColumns,
    rightColumns
  }
}

//
export const computeColumnPinningPositions: <TData>(
  column: Column<TData, unknown>,
  table: Table<TData>,
  widths?: ComputedColumnWidths
) => ComputedColumnPinningPositions = (column, table, widths = {}) => {
  let width = getComputedColumnWidth(column, widths)
  const { left, right } = computeHeaderPinningPositions(column, table, widths)

  //
  return {
    width,
    left,
    right
  }
}

//
// ##############################
// * ########## Set Column Pinning Styles
// ##############################
//
export const setColumnPinningStyles: <TData>(
  column: Column<TData, unknown>,
  width: number,
  left?: number,
  right?: number
) => ColumnStyles = (column, width, left, right) => {
  const isPinned = column.getIsPinned()
  const { isLeft, isRight } = getColumnPositions(isPinned)

  //
  const { isLeftLastColumn } = getLeftColumnPositions(column)
  const { isRightLastColumn } = getRightColumnPositions(column)

  //
  const background = isPinned ? 'white' : undefined
  const position = isPinned ? 'sticky' : 'relative'
  const zIndex = isPinned ? 1 : 0

  //
  const leftPosition = isLeft ? `${left}px` : undefined
  const rightPosition = isRight ? `${right}px` : undefined

  //
  let boxShadow
  let marginRight
  let marginLeft

  //
  if (isLeft) {
    if (isLeftLastColumn) {
      // marginRight = '20px'
      boxShadow = '30px 0px 25px -20px rgb(0 0 0 / 50%)'
    }
  } else if (isRight) {
    if (isRightLastColumn) {
      // marginLeft = '20px'
      boxShadow = '-30px 0px 25px -20px rgb(0 0 0 / 50%)'
    }
  }

  //
  const allStyles: CSSProperties = {
    //
    background,
    position,
    zIndex,
    //
    width,
    left: leftPosition,
    right: rightPosition,
    //
    boxShadow,
    marginRight,
    marginLeft
  }

  //
  const columnStyles: CSSProperties = {
    ...allStyles,
    boxShadow: undefined
  }

  //
  const boxShadowStyles: CSSProperties = {
    //
    boxShadow
  }

  //
  const resizerStyles: CSSProperties = {
    //
    marginRight: isLeft && !isLeftLastColumn ? '20px' : undefined
    // marginLeft: isRight && !isRightLastColumn ? '20px' : undefined
  }

  //
  return {
    all: allStyles,
    column: columnStyles,
    boxShadow: boxShadowStyles,
    resizer: resizerStyles
  }
}

//
export const setColumnPinningClassNames: <TData>(
  column: Column<TData, unknown>
) => string = column => {
  // const isPinned = column.getIsPinned()
  // const {isLeft, isRight } = getColumnPositions(isPinned)

  // //
  // const { isLeftLastColumn } = getLeftColumnPositions(column)
  // const { isRightFirstColumn } = getRightColumnPositions(column)

  //
  return ''
}

////
// ##############################
// * ########## Get Column Pinning Styles
// ##############################
//

export const getHeaderColumnPinningStyles: <TData>(
  header: Header<TData, unknown>,
  widths?: ComputedColumnWidths
) => ComputedColumnStyles = (header, widths = {}) => {
  const { column } = header

  //
  const table = header.getContext().table
  const { width, left, right } = computeColumnPinningPositions(
    column,
    table,
    widths
  )

  //
  const className = setColumnPinningClassNames(column)
  const styles = setColumnPinningStyles(column, width, left, right)

  //
  return {
    styles,
    className
  }
}

//
export const getCellColumnPinningStyles: <TData>(
  cell: Cell<TData, unknown>,
  widths?: ComputedColumnWidths
) => ComputedColumnStyles = (cell, widths = {}) => {
  const { column } = cell

  //
  const table = cell.getContext().table
  const { width, left, right } = computeColumnPinningPositions(
    column,
    table,
    widths
  )

  //
  const className = setColumnPinningClassNames(column)
  const styles = setColumnPinningStyles(column, width, left, right)

  //
  return {
    styles,
    className
  }
}

//
//
export const getColumnPinningStyles: <TData>(
  document: Header<TData, unknown> | Cell<TData, unknown>,
  mode?: 'header' | 'cell',
  widths?: ComputedColumnWidths
) => ComputedColumnStyles = (document, mode = 'header', widths = {}) => {
  //
  if (mode === 'cell') {
    return getCellColumnPinningStyles(
      document as Cell<unknown, unknown>,
      widths
    )
  }

  return getHeaderColumnPinningStyles(
    document as Header<unknown, unknown>,
    widths
  )
}

//
// ##############################
// * ########## Column Pinning Buttons
// ##############################
//
export const customColumnPinning: <TData>(
  header: Header<TData, unknown>
) => JSX.Element | null = header => {
  //
  const unpin = header.column.getIsPinned() ? (
    <button
      className='rounded border px-2'
      onClick={() => {
        header.column.pin(false)
      }}
    >
      x
    </button>
  ) : null

  //
  const left =
    header.column.getIsPinned() !== 'left' ? (
      <button
        className='rounded border px-2'
        onClick={() => {
          header.column.pin('left')
        }}
      >
        {'<-'}
      </button>
    ) : null

  //
  const right =
    header.column.getIsPinned() !== 'right' ? (
      <button
        className='rounded border px-2'
        onClick={() => {
          header.column.pin('right')
        }}
      >
        {'->'}
      </button>
    ) : null

  //
  return !header.isPlaceholder && header.column.getCanPin() ? (
    <div className='flex h-full items-center text-nowrap'>
      {left}
      {unpin}
      {right}
    </div>
  ) : null
}

//
// ##############################
// * ########## Column Pinning Resizer
// ##############################
//
export const customColumnResizer: <TData>(
  header: Header<TData, unknown>,
  styles?: CSSProperties
) => JSX.Element = (header, styles) => {
  const { column } = header
  const isPinned = column.getIsPinned()
  const { isLeft, isRight } = getColumnPositions(isPinned)

  //
  let resizeStyles = 'absolute top-0 cursor-col-resize touch-none user-none'
  const resizingStyles = header.column.getIsResizing() ? 'text-blue-500' : ''

  //
  const layout = 'flex justify-center items-center'
  const sizes = 'w-[20px] min-w-[20px] h-full'

  //
  let resizeIcon
  if (isLeft) {
    resizeIcon = 'translate-x-[10px]'
    resizeStyles = `${resizeStyles} right-0`
  } else if (isRight) {
    resizeIcon = '-translate-x-[10px]'
    resizeStyles = `${resizeStyles} left-0`
  }

  //
  return (
    <div className={`${layout}`}>
      <div className={`${layout} ${sizes}`} />
      <div
        style={{ ...styles }}
        {...{
          onDoubleClick: () => header.column.resetSize(),
          onClick: header.getResizeHandler(),
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `${layout} ${sizes} ${resizeStyles} ${resizingStyles} ${resizeIcon}`
        }}
      >
        <FoldHorizontal />
      </div>
    </div>
  )
}
