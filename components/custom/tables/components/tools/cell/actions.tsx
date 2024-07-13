import { Button } from '@/components/ui/button'
import { CellContext } from '@tanstack/react-table'
import { SquarePen, Trash } from 'lucide-react'

//
export const customCellActions = <T,>(
  cellContext: CellContext<T, unknown>,
  updateCb?: (arg?: any, ...args: any[]) => void,
  deleteCb?: (arg?: any, ...args: any[]) => void
) => {
  const {
    row: { original }
  } = cellContext

  //
  return (
    <div className='pt flex items-center pr-1'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => {
          const data = original

          //
          if (updateCb) {
            updateCb(data)
          }
        }}
      >
        <SquarePen className='h-4 w-4' strokeWidth={1.5} />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => {
          const { id } = { id: '', ...original }

          //
          if (deleteCb) {
            deleteCb(id)
          }
        }}
      >
        <Trash className='h-4 w-4' strokeWidth={1.5} />
      </Button>
    </div>
  )
}
