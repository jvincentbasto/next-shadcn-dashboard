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
          const { __v, ...rest } = { __v: '', ...original }

          //
          if (updateCb) {
            updateCb({ ...rest })
          }
        }}
      >
        <SquarePen className='h-4 w-4' strokeWidth={1.5} />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => {
          const { _id } = { _id: '', ...original }

          if (deleteCb) {
            deleteCb(_id)
          }
        }}
      >
        <Trash className='h-4 w-4' strokeWidth={1.5} />
      </Button>
    </div>
  )
}
