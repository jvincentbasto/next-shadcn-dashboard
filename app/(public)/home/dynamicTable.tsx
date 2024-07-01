import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import {
  getTableColumnsBySchema,
  includeCustomColumnTools
} from '@/components/custom/tables/components/tools/column/column'
import CustomTable from '@/components/custom/tables/custom-table'
import { TDynamicData } from '@/states/redux/store/slices/dynamicSlice'

const DynamicDataTable = ({
  data = [],
  fields = [],
  updateCb,
  deleteCb
}: Readonly<{
  data: TDynamicData[]
  fields: TFieldObject[]
  updateCb?: (arg?: any, ...args: any[]) => void
  deleteCb?: (arg?: any, ...args: any[]) => void
}>) => {
  const tableColumns = getTableColumnsBySchema(fields)
  const columns = includeCustomColumnTools(
    tableColumns,
    true,
    false,
    updateCb,
    deleteCb
  )

  //
  return <CustomTable data={data} columns={columns} />
}

export default DynamicDataTable
