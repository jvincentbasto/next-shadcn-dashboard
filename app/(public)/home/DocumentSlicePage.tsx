'use client'

import dynamic from 'next/dynamic'
import { File, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DocumentForm from '@/components/custom/forms/DocumentForm'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/states/redux/store'
import {
  createDocumentSlice,
  deleteDynamicDocument
} from '@/states/redux/store/slices/documentSlice'
import { useEffect } from 'react'
import injectSlice from '@/states/redux/store/injectSlice'
import { TSchemaDocumentParsed } from '@/db/mongodb/utilities'

const nextDynamicOptions = { ssr: false }
const DocumentDataTable = dynamic(
  () => import('@/components/custom/tables/DocumentTable'),
  { ...nextDynamicOptions }
)

//
export default function DocumentSlicePage({
  schema,
  data = []
}: Readonly<{
  schema: TSchemaDocumentParsed
  data: any[]
}>) {
  const dispatch = useDispatch()
  const appDispatch = useAppDispatch()

  //
  const { schemaName, formName } = schema

  //
  if (!formName) return null
  const documentSlice = createDocumentSlice(formName, schemaName)
  const { reducer, actions } = documentSlice
  const { setData, setDialog, setForm } = actions

  //
  useEffect(() => {
    injectSlice(formName, reducer)
  }, [formName])

  //
  const selector = useSelector((state: RootState) => state[formName])
  const { data: dataTable, loading, status } = selector

  //
  useEffect(() => {
    dispatch(setData(data))
  }, [JSON.stringify(data)])

  //
  const deleteDocument = deleteDynamicDocument(formName, schemaName)

  //
  const addCb = () => {
    dispatch(setDialog(true))
    dispatch(setForm(null))
  }
  const updateCb = (item: any) => {
    dispatch(setDialog(true))
    dispatch(setForm(item))
  }
  const deleteCb = (id: string) => {
    appDispatch(deleteDocument(id))
  }
  const tableActions = {
    updateCb,
    deleteCb
  }

  //
  const formActions = {
    setDialog,
    setForm
  }

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
            <Button size='sm' className='h-8 gap-1' onClick={() => addCb()}>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value='all' className='w-full'>
          <DocumentDataTable
            data={dataTable}
            properties={selector}
            schema={schema}
            actions={tableActions}
          />
        </TabsContent>
      </Tabs>
      <DocumentForm schema={schema} actions={formActions} />
    </>
  )
}
