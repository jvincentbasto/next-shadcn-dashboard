import {
  getTableColumnsBySchema,
  includeCustomColumnTools
} from '@/components/custom/tables/components/tools/column/column'
import CustomTable from '@/components/custom/tables/CustomTable'
import { TSchemaDocumentParsed } from '@/db/mongodb/utilities'
import { TDocumentData } from '@/states/redux/store/slices/documentSlice'

//
type TCallback = (arg?: any, ...args: any[]) => void
type TActions = {
  [key: string]: any
  updateCb: TCallback
  deleteCb: TCallback
}

//
type TProps = {
  data: TDocumentData[]
  properties: { [key: string]: any }
  schema: TSchemaDocumentParsed
  actions: TActions
}

//
const DocumentDataTable = ({
  data = [],
  schema,
  actions
}: Readonly<TProps>) => {
  const { formFields } = schema

  //
  if (!formFields) return null
  const tableColumns = getTableColumnsBySchema(formFields)
  const columns = includeCustomColumnTools(tableColumns, true, false, actions)

  //
  return <CustomTable data={data} columns={columns} />
}

export default DocumentDataTable
