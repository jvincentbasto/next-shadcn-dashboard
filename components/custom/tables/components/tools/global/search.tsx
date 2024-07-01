import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'

//
export const enableTableSearch = true

//
export const customTableSearch = <T,>(table: Table<T>) => {
  //
  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Search by name...'
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={event =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
      />
    </div>
  )
}
