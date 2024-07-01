'use client'

import dynamic from 'next/dynamic'
import { File, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DynamicForm from '@/components/custom/forms/DynamicForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/states/redux/store'
import {
  TDynamicData,
  createDocumentSlice,
  deleteDynamicDocument
} from '@/states/redux/store/slices/dynamicSlice'
import { useEffect } from 'react'
import injectSlice from '@/states/redux/store/injectSlice'

const nextDynamicOptions = { ssr: false }
const DynamicDataTable = dynamic(() => import('./dynamicTable'), {
  ...nextDynamicOptions
})

//
export default function DynamicSlice({
  schema = {},
  data = []
}: Readonly<{
  schema: { [key: string]: any }
  data: TDynamicData[]
}>) {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch()

  //
  const { schemaName, formName, fields, schema: schemaDefinition } = schema

  //
  const documentSlice = createDocumentSlice(formName, schemaName)
  const { reducer, actions } = documentSlice

  //
  useEffect(() => {
    injectSlice(formName, reducer)
  }, [])

  //
  const { setData, setDialog, setForm } = actions
  const deleteDocument = deleteDynamicDocument(formName, schemaName)

  //
  const updateCb = (item: any) => {
    dispatch(setDialog(true))
    dispatch(setForm(item))
  }
  const deleteCb = (id: string) => {
    appDispatch(deleteDocument(id))
  }

  //
  const { data: stateData } = useSelector((state: RootState) => state[formName])

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

  //
  return (
    <>
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
            <Button
              size='sm'
              className='h-8 gap-1'
              onClick={() => {
                dispatch(setDialog(true))
                dispatch(setForm(null))
              }}
            >
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value='all' className='w-full'>
          <DynamicDataTable
            data={stateData}
            fields={fields}
            updateCb={updateCb}
            deleteCb={deleteCb}
          />
        </TabsContent>
      </Tabs>
      <DynamicForm
        formName={formName}
        schemaName={schemaName}
        fields={fields}
        setDialog={setDialog}
        schemaDefinition={schemaDefinition}
        schemaFields={[]}
      />
    </>
  )
}
