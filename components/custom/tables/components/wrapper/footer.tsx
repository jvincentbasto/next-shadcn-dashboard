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

{
  /* <div className="flex items-center gap-2">
<button
  className="border rounded p-1"
  onClick={() => table.firstPage()}
  disabled={!table.getCanPreviousPage()}
>
  {'<<'}
</button>
<button
  className="border rounded p-1"
  onClick={() => table.previousPage()}
  disabled={!table.getCanPreviousPage()}
>
  {'<'}
</button>
<button
  className="border rounded p-1"
  onClick={() => table.nextPage()}
  disabled={!table.getCanNextPage()}
>
  {'>'}
</button>
<button
  className="border rounded p-1"
  onClick={() => table.lastPage()}
  disabled={!table.getCanNextPage()}
>
  {'>>'}
</button>
<span className="flex items-center gap-1">
  <div>Page</div>
  <strong>
    {table.getState().pagination.pageIndex + 1} of{' '}
    {table.getPageCount().toLocaleString()}
  </strong>
</span>
<span className="flex items-center gap-1">
  | Go to page:
  <input
    type="number"
    defaultValue={table.getState().pagination.pageIndex + 1}
    onChange={e => {
      const page = e.target.value ? Number(e.target.value) - 1 : 0
      table.setPageIndex(page)
    }}
    className="border p-1 rounded w-16"
  />
</span>
<select
  value={table.getState().pagination.pageSize}
  onChange={e => {
    table.setPageSize(Number(e.target.value))
  }}
>
  {[10, 20, 30, 40, 50].map(pageSize => (
    <option key={pageSize} value={pageSize}>
      Show {pageSize}
    </option>
  ))}
</select>
{dataQuery.isFetching ? 'Loading...' : null}
</div> */
}
