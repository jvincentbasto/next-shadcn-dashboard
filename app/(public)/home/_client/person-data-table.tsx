'use client'

import { includeCustomColumnTools } from '@/components/custom/tables/components/tools/column/column'
import CustomTable from '@/components/custom/tables/custom-table'
import {
  makeData,
  columns as personColumns
} from '@/components/custom/tables/samples/person'

const PersonDataTable = () => {
  const data = makeData(30)
  const columns = includeCustomColumnTools(personColumns)

  //
  return <CustomTable data={data} columns={columns} />
}

export default PersonDataTable
