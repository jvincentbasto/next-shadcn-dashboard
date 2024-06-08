import { TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  customColumnBoxShadow,
  getTableHeaderBoxShadowClassNames
} from '../layout/box-shadow'
import { ColumnPinningPosition, Header, Table } from '@tanstack/react-table'
import { customTableHead } from '../parts/cells'
import { getColumnPositions } from '../utilities/column'
import { hasStringMatch } from '@/lib/utilities/string'
import { getTableHeaderPositionClassNames } from '../utilities/row'

//
export const setCustomHeaderGroup = <TData,>(
  headers: Header<TData, unknown>[] = []
) => {
  //
  const customHeaders = headers.map(header => {
    return customTableHead(header)
  })

  return customHeaders
}

//
export const customTableHeaderColumn = <T,>(
  table: Table<T>,
  position: ColumnPinningPosition = false
) => {
  //
  const getHeaderGroup = () => {
    const { isLeft, isRight } = getColumnPositions(position)
    let headers = table.getCenterHeaderGroups() || []

    //
    if (isLeft) {
      headers = table.getLeftHeaderGroups()
    }
    if (isRight) {
      headers = table.getRightHeaderGroups()
    }

    return headers
  }

  //
  const list = getHeaderGroup()
    .filter(headers => headers.headers.length > 0)
    .map(headerGroup => {
      const isRight = hasStringMatch(headerGroup.id, 'right')

      //
      let headers = headerGroup.headers
      if (isRight) {
        headers = [...headerGroup.headers].reverse()
      }

      return (
        <div
          key={headerGroup.id}
          className='flex h-full items-center justify-start border-0'
        >
          {setCustomHeaderGroup(headers)}
        </div>
      )
    })

  //
  return customColumnBoxShadow(position, list, true)
}

//
export const customTableHeader = <T,>(
  table: Table<T>,
  className: string = ''
) => {
  const headerPositions = getTableHeaderPositionClassNames()
  const headerBoxShadow = getTableHeaderBoxShadowClassNames()
  const background = 'bg-gray-50'

  //
  return (
    <TableHeader
      className={cn(
        `${background} ${headerPositions} ${headerBoxShadow}`,
        className
      )}
    >
      <TableRow className={`border-0 hover:${background}`}>
        {customTableHeaderColumn(table, 'left')}
        {customTableHeaderColumn(table)}
        {customTableHeaderColumn(table, 'right')}
      </TableRow>
    </TableHeader>
  )
}
