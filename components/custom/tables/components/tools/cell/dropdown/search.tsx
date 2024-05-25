import { Input } from '@/components/ui/input'
import { Column } from '@tanstack/react-table'

//
export const enableDropdownSearch = true

//
export const customDropdownSearch = <T,>(column: Column<T, unknown>) => {
  return (
    <div className='flex items-center font-normal'>
      <Input
        placeholder={`Search...`}
        value={(column.getFilterValue() as string) ?? ''}
        onChange={event => column.setFilterValue(event.target.value)}
        className='max-w-sm'
      />
    </div>
  )
}
