import { CardContent } from '@/components/ui/card'
import { customTableTools, enableTableTools } from '../tools/global/global'
import { Table } from '@tanstack/react-table'

//
type booleanObject = GenerateObjectType<boolean>

//
export const enableTableCardContent = true
export const defaultCardContentOptions = {
  enable: enableTableCardContent,
  tools: enableTableTools
}

//
export const customTableCardContent = <T,>(
  slot: JSX.Element,
  table: Table<T>,
  options: booleanObject = defaultCardContentOptions
) => {
  const { enable, tools } = { ...defaultCardContentOptions, ...options }

  //
  const customCardContent = enable ? (
    <CardContent className='flex w-full flex-col pt-10'>
      {tools ? customTableTools(table) : null}
      {slot}
    </CardContent>
  ) : null

  return customCardContent
}
