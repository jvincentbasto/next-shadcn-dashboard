import { TableFooter } from '@/components/ui/table'
import { cn } from '@/lib/utils'

//
export const customTableFooter = (className: string = '') => {
  //
  return <TableFooter className={cn('unset', className)}></TableFooter>
}
