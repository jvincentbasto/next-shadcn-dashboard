import { Table } from '@tanstack/react-table'
import { customTableSearch, enableTableSearch } from './search'
import { customTableVisibility, enableTableVisibility } from './visibility'

//
type booleanObject = GenerateObjectType<boolean>
export const enableTableTools = true
export const defaultTableOptions = {
  enable: enableTableTools,
  search: enableTableSearch,
  visibility: enableTableVisibility
}

//
export const customTableTools = <T,>(
  table: Table<T>,
  options?: booleanObject
) => {
  const { search, visibility } = { ...defaultTableOptions, ...options }

  //
  return (
    <div className='flex items-center justify-between'>
      {search ? customTableSearch(table) : null}
      {visibility ? customTableVisibility(table) : null}
    </div>
  )
}
