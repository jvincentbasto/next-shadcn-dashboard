'use client'

import { Table } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { getComputedTotalColumnWidth } from './components/utilities/cells'
import {
  customTableCard,
  defaultCardFooterProps,
  defaultCardHeaderProps
} from './components/wrapper/card'
import { customTableFooter } from './components/main/footer'
import { customTableHeader } from './components/main/header'
import { customTableBody } from './components/main/body'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

//
type CustomTableProps<TData, TValue> = {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  //
  headerOptions?: GenerateObjectType<string>
  footerOptions?: GenerateObjectType<number | string>
}

//
const CustomTable = <TData, TValue>({
  data = [],
  columns = [],
  //
  headerOptions = defaultCardHeaderProps,
  footerOptions = defaultCardFooterProps
}: CustomTableProps<TData, TValue>) => {
  const { title, description } = { ...defaultCardHeaderProps, ...headerOptions }
  const {
    page,
    total,
    title: titleFooter
  } = { ...defaultCardFooterProps, ...footerOptions }

  //
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
  const totalTableSize = getComputedTotalColumnWidth(table.getAllColumns())
  const customTable = (
    <ScrollArea className='relative h-80 w-full overflow-auto rounded-md border'>
      <Table
        className={cn('relative h-full border-separate border-spacing-0', '')}
        style={{ width: `${totalTableSize}px` }}
      >
        {customTableHeader(table)}
        {customTableBody(table, columns)}
        {customTableFooter()}
      </Table>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )

  //
  return customTableCard(
    customTable,
    table,
    { title, description },
    { page, total, titleFooter }
  )
}

export default CustomTable
