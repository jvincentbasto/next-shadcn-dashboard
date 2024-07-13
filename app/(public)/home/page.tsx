import dynamic from 'next/dynamic'
import {
  convertToSchemaDefinitions,
  createDynamicModel,
  createDynamicSchema,
  validateSchemaDefinitions
} from '@/db/mongodb/utilities/ssrDocument'
import { axiosFetchDynamicDocuments } from '@/http/axios/api/documents'
import { schemaDocument } from '@/db/mongodb/definitions/user'
import { parseSchemaDocument } from '@/db/mongodb/utilities/documents'

//
const nextDynamicOptions = { ssr: false }
const DocumentSlicePage = dynamic(() => import('./DocumentSlicePage'), {
  ...nextDynamicOptions
})

//
export default async function HomePage() {
  const parsedSchemaDocument = parseSchemaDocument(schemaDocument)
  const { schemaName, schemaDefinition } = parsedSchemaDocument

  //
  if (!schemaDefinition) return null
  const convertedSchema = convertToSchemaDefinitions(schemaDefinition)
  const validate = validateSchemaDefinitions(convertedSchema)
  if (validate.length > 0) return null

  //
  const dynamicSchema = createDynamicSchema(convertedSchema)
  const dynamicModel = createDynamicModel(schemaName, dynamicSchema)
  if (!dynamicModel) return null

  //
  const dynamicDocument = await axiosFetchDynamicDocuments(schemaName)
  if (!dynamicDocument.success) return null
  console.log('dynamicDocumentss', dynamicDocument.data.length)

  //
  return (
    <div className='min-h-screen w-full bg-muted/40 px-4 pt-4'>
      <DocumentSlicePage
        schema={parsedSchemaDocument}
        data={dynamicDocument.data}
      />
    </div>
  )
}
