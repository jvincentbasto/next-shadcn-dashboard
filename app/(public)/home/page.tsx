import dynamic from 'next/dynamic'
import { File, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

//
const nextDynamicOptions = { ssr: false }
const PersonDataTable = dynamic(() => import('./_client/person-data-table'), {
  ...nextDynamicOptions
})

export default function HomePage() {
  //
  return (
    <div className='min-h-screen w-full bg-muted/40 px-4 pt-4'>
      <Tabs defaultValue='all'>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='draft'>Draft</TabsTrigger>
            <TabsTrigger value='archived' className='hidden sm:flex'>
              Archived
            </TabsTrigger>
          </TabsList>
          <div className='ml-auto flex items-center gap-2'>
            <Button size='sm' variant='outline' className='h-8 gap-1'>
              <File className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Export
              </span>
            </Button>
            <Button size='sm' className='h-8 gap-1'>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value='all' className='w-full'>
          <PersonDataTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
