import { TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { customColumnBoxShadow } from '../layout/box-shadow'
import { ColumnPinningPosition, Header, Table } from '@tanstack/react-table'
import { customTableHead } from '../parts/cells'
import { getColumnPositions } from '../utilities/column'
import { hasStringMatch } from '@/lib/utilities/string'

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
        <TableRow key={headerGroup.id} className='border-0'>
          {setCustomHeaderGroup(headers)}
        </TableRow>
      )
    })

  //
  return customColumnBoxShadow(position, list)
}

//
export const customTableHeader = <T,>(
  table: Table<T>,
  className: string = ''
) => {
  //
  return (
    <TableHeader className={cn('', className)}>
      <TableRow className='border-0'>
        {customTableHeaderColumn(table, 'left')}
        {customTableHeaderColumn(table)}
        {customTableHeaderColumn(table, 'right')}
      </TableRow>
    </TableHeader>
  )
}
