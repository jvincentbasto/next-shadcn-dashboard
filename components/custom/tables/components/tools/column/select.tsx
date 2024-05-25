import { Checkbox } from '@/components/ui/checkbox'
import { Row, Table } from '@tanstack/react-table'

//
export const customSelectColumnHeader = <T,>(table: Table<T>) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      aria-label='Select all'
    />
  )
}

//
export const customSelectColumnCell = <T,>(row: Row<T>) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={value => row.toggleSelected(!!value)}
      aria-label='Select row'
    />
  )
}
