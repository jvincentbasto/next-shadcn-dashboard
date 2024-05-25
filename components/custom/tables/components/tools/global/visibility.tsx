import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'

//
export const enableTableVisibility = true

//
export const customTableVisibility = <T,>(table: Table<T>) => {
  //
  const columns = table.getAllColumns()
  const filteredColumns = columns.filter(column => column.getCanHide())

  //
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='ml-auto'>
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {filteredColumns.map(column => {
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
}
