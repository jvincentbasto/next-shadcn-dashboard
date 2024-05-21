'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningPosition,
  Header,
  HeaderGroup,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  getColumnPinningStyles,
  customColumnPinning,
  customColumnResizer,
  getComputedColumnTotalWidth,
  getColumnPositions
} from './table-components/table-columns'
import { CSSProperties, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface CustomTablePropInterface<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  //
  title?: string
  description?: string
  listTitle?: string
  //
  pageSize?: string
  pageTotal?: number
  //
  enableHeader?: boolean
  enableFooter?: boolean
  //
  classNameTable?: string
  classNameTableHeader?: string
  classNameTableBody?: string
  classNameTableFooter?: string
}

const CustomTable = <TData, TValue>({
  columns = [],
  data = [],
  //
  title = '',
  description = '',
  listTitle = '',
  //
  pageSize = '1-10',
  pageTotal = 50,
  //
  enableHeader = true,
  enableFooter = true,
  //
  classNameTable = '',
  classNameTableHeader = '',
  classNameTableBody = '',
  classNameTableFooter = ''
}: CustomTablePropInterface<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  //
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    //
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    //
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
    //
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  })

  //
  const customSearch = (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Search by name...'
        value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
        onChange={event =>
          table.getColumn('firstName')?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
      />
    </div>
  )

  //
  const customColumnVisibilitys = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='ml-auto'>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {table
          .getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  //
  const setCustomGroupHeaders: <TData>(
    headers: Header<TData, unknown>[]
  ) => JSX.Element[] = (headers = []) => {
    //
    const customHeaders = headers.map(header => {
      const { column } = header
      const isPinned = column.getIsPinned()
      const { isLeft, isRight } = getColumnPositions(isPinned)

      //
      const { className, styles } = getColumnPinningStyles(header)
      const { column: columnStyles, resizer } = styles

      //
      return (
        <TableHead
          key={header.id}
          colSpan={header.colSpan}
          className={`relative h-full ${className}`}
          style={{
            ...columnStyles
          }}
        >
          {isRight ? customColumnResizer(header, resizer) : null}
          <div className='flex h-full items-center justify-center overflow-hidden'>
            <div className='mr-2 whitespace-nowrap'>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </div>
            {customColumnPinning(header)}
          </div>
          {isLeft ? customColumnResizer(header, resizer) : null}
        </TableHead>
      )
    })

    return customHeaders
  }

  //
  const customTableHeaderColumn: (
    position?: ColumnPinningPosition
  ) => JSX.Element | null = (position = false) => {
    //
    const getHeaderGroup = () => {
      let headers = table.getCenterHeaderGroups() || []

      //
      if (position === 'left') {
        headers = table.getLeftHeaderGroups()
      }
      if (position === 'right') {
        headers = table.getRightHeaderGroups()
      }

      return headers
    }

    //
    const headers = getHeaderGroup()
      .map(headerGroup => {
        const hasStringRight = headerGroup.id.match(/right/) ?? []
        const isRight = hasStringRight[0] === 'right'

        //
        let headers = headerGroup.headers
        if (isRight) {
          headers = [...headerGroup.headers].reverse()
        }

        //
        if (headers.length === 0) return null

        return (
          <TableRow key={headerGroup.id} className='border-0'>
            {' '}
            {setCustomGroupHeaders(headers)}
          </TableRow>
        )
      })
      .filter(f => f !== null)

    //
    let styles: CSSProperties = {}
    if (position === 'left') {
      styles = {
        position: 'sticky',
        left: 0,
        zIndex: 1,
        marginRight: '20px',
        boxShadow: '15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
      }
    }
    if (position === 'right') {
      styles = {
        position: 'sticky',
        right: 0,
        zIndex: 1,
        marginLeft: '20px',
        boxShadow: '-15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
      }
    }

    //
    return headers.length > 0 ? (
      <div style={{ ...styles }}>{headers}</div>
    ) : null
  }

  //
  const customTableHeaders = (
    <TableHeader className={cn('', classNameTableHeader)}>
      <TableRow className='border-0'>
        {customTableHeaderColumn('left')}
        {customTableHeaderColumn()}
        {customTableHeaderColumn('right')}
      </TableRow>
    </TableHeader>
  )

  //
  const emptyTableRows = (
    <TableBody className={cn('h-[200px]', classNameTableBody)}>
      <TableRow className='flex min-h-full items-center justify-center'>
        <TableCell colSpan={columns.length} className='mb-[10px] text-center'>
          No Results
        </TableCell>
      </TableRow>
    </TableBody>
  )

  const setCustomVisibleCells: <TData>(
    cells: Cell<TData, unknown>[]
  ) => JSX.Element[] = cells => {
    //
    return cells.map(cell => {
      const { className, styles } = getColumnPinningStyles(cell, 'cell')
      const { column } = styles

      //
      return (
        <TableCell
          key={cell.id}
          className={`${className}`}
          style={{
            ...column
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      )
    })
  }

  //
  const customTableBodyColumn: (
    position?: ColumnPinningPosition
  ) => JSX.Element | null = (position = false) => {
    const rows = table.getRowModel().rows

    //
    const getVisibileCells = (row: Row<TData>) => {
      let cells = row.getCenterVisibleCells() || []

      //
      if (position === 'left') {
        cells = row.getLeftVisibleCells()
      }
      if (position === 'right') {
        const right = row.getRightVisibleCells()
        cells = [...right].reverse()
      }

      return cells
    }

    //
    const list = rows
      .map(row => {
        const cells = getVisibileCells(row)
        if (cells.length === 0) return null

        //
        return (
          <TableRow key={row.id} className='border-0'>
            {setCustomVisibleCells(cells)}
          </TableRow>
        )
      })
      .filter(f => f !== null)

    //
    let styles: CSSProperties = {}
    if (position === 'left') {
      styles = {
        position: 'sticky',
        left: 0,
        zIndex: 1,
        marginRight: '20px',
        boxShadow: '15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
      }
    }
    if (position === 'right') {
      styles = {
        position: 'sticky',
        right: 0,
        zIndex: 1,
        marginLeft: '20px',
        boxShadow: '-15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
      }
    }

    //
    return list.length > 0 ? <div style={{ ...styles }}>{list}</div> : null
  }

  //
  const customTableBody =
    table.getRowModel().rows.length > 0 ? (
      <TableBody className={cn('relative flex min-h-full', classNameTableBody)}>
        {customTableBodyColumn('left')}
        {customTableBodyColumn()}
        {customTableBodyColumn('right')}
      </TableBody>
    ) : (
      emptyTableRows
    )

  //
  const customTableFooter = (
    <TableFooter className={cn('unset', classNameTableFooter)}></TableFooter>
  )

  //
  const totalTableSize = getComputedColumnTotalWidth(table)
  const customTable = (
    <Table
      className={cn('h-full border-separate border-spacing-0', classNameTable)}
      classNameWrapper={cn('overflow-auto h-80 w-full relative', '')}
      style={{ width: `${totalTableSize}px` }}
    >
      {customTableHeaders}
      {customTableBody}
      {customTableFooter}
    </Table>
  )

  //
  const hasTitle = title.trim() !== ''
  const hasDescription = description.trim() !== ''
  const customCardHeader =
    enableHeader && (hasTitle || hasDescription) ? (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    ) : null

  //
  const hasPageSize = pageSize.trim() !== ''
  const hasPageTotal = pageTotal > 0
  const customCardFooter =
    enableFooter && hasPageSize && hasPageTotal ? (
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing <strong>{pageSize}</strong> of <strong>{pageTotal}</strong>{' '}
          {listTitle || 'items'}
        </div>
      </CardFooter>
    ) : null

  const customTools = (
    <div className='flex items-center justify-between'>
      {customSearch}
      {customColumnVisibilitys}
    </div>
  )

  return (
    <Card className='h-full w-full'>
      {customCardHeader}
      <CardContent className='flex w-full flex-col pt-10'>
        {customTools}
        {customTable}
      </CardContent>
      {customCardFooter}
    </Card>
  )
}

export default CustomTable
