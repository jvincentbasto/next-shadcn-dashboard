import { TableCell, TableHead } from '@/components/ui/table'
import { Cell, Column, Header, flexRender } from '@tanstack/react-table'
import {
  centerColumnSeparator,
  getColumnSeparatorWidth,
  leftColumnSeparator,
  rightColumnSeparator
} from '../utilities/separator'
import { getColumnPositions } from '../utilities/column'
import { getTableCellStyles } from '../utilities/cells'
import { customColumnSeparatorBlock } from '../tools/header/separator'
import { CustomCellDropdown } from '../tools/cell/dropdown/dropdown'

//
// ##############################
// * ########## Custom Table Cells
// ##############################
//

//
export const customTableCellFormat = <T,>(
  column: Column<T, unknown>,
  slot?: JSX.Element | React.ReactNode,
  slotTools?: JSX.Element,
  element: 'header' | 'cell' = 'header',
  test: boolean = false
) => {
  //
  const isPinned = column.getIsPinned()
  const { isLeft, isRight, isCenter } = getColumnPositions(isPinned)

  //
  const getSeparator = () => {
    if (isLeft) {
      return leftColumnSeparator
    }
    if (isRight) {
      return rightColumnSeparator
    }

    return centerColumnSeparator
  }

  //
  const separator = getSeparator()
  const separatorWidth = getColumnSeparatorWidth(separator)

  //
  const layout = 'h-full w-full flex items-center'
  const paddingRight = separatorWidth

  //
  let paddingLeft = isLeft || isCenter ? '25px' : undefined
  if (isRight) {
    paddingLeft = element === 'cell' ? '25px' : '0px'
  }

  const containerStyles = {
    paddingLeft,
    paddingRight: isRight ? separatorWidth : undefined
  }

  //
  return (
    <div
      className={`${layout} min-w-max overflow-hidden`}
      style={{ ...containerStyles }}
    >
      <div
        className={`${layout} min-w-max justify-between whitespace-nowrap`}
        style={{ paddingRight }}
      >
        {slot ?? null}
      </div>
      {slotTools ?? null}
    </div>
  )
}

//
export const customTableHead = <T,>(header: Header<T, unknown>) => {
  const { column } = header

  //
  const { className, styles } = getTableCellStyles(header)
  const { tableCell } = styles

  //
  const dataHeader = header.isPlaceholder
    ? null
    : flexRender(column.columnDef.header, header.getContext())

  //
  const customHeaderTools = <CustomCellDropdown header={header} />
  const cell = customTableCellFormat(column, dataHeader, customHeaderTools)

  //
  return (
    <TableHead
      key={header.id}
      colSpan={header.colSpan}
      className={`relative h-full p-0 ${className}`}
      style={{
        ...tableCell.cell
      }}
    >
      {customColumnSeparatorBlock(header, cell)}
    </TableHead>
  )
}

//
export const customTableCell = <TData,>(cell: Cell<TData, unknown>) => {
  const { className, styles } = getTableCellStyles(cell, 'cell')
  const { tableCell } = styles

  //
  const dataCell = flexRender(cell.column.columnDef.cell, cell.getContext())

  //
  return (
    <TableCell
      key={cell.id}
      className={`${className} p-0`}
      style={{
        ...tableCell.cell
      }}
    >
      {customTableCellFormat(cell.column, dataCell, undefined, 'cell')}
    </TableCell>
  )
}
