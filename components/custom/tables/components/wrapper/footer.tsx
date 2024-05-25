import { CardFooter } from '@/components/ui/card'

//
export const enableTableCardFooter = true

//
export const customTableCardFooter = (
  page: number = 1,
  total: number = 1,
  title: string = '',
  enable: boolean = enableTableCardFooter
) => {
  //
  const customCardFooter = enable ? (
    <CardFooter>
      <div className='text-xs text-muted-foreground'>
        Showing <strong>{page}</strong> of <strong>{total}</strong>{' '}
        {title || 'items'}
      </div>
    </CardFooter>
  ) : null

  return customCardFooter
}
