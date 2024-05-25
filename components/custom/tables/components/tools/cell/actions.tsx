import { Button } from '@/components/ui/button'
import { SquarePen, Trash } from 'lucide-react'

//
export const customCellActions = <T,>() => {
  //
  return (
    <div className='pt flex items-center'>
      <Button variant='ghost' size='icon'>
        <SquarePen className='h-4 w-4' strokeWidth={1.5} />
      </Button>
      <Button variant='ghost' size='icon'>
        <Trash className='h-4 w-4' strokeWidth={1.5} />
      </Button>
    </div>
  )
}
