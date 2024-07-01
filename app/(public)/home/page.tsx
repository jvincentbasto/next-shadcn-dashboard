import dynamic from 'next/dynamic'
import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
import {
  convertToSchemaDefinitions,
  createDynamicModel,
  createDynamicSchema,
  validateSchemaDefinitions
} from '@/db/mongodb/models/dynamic'
import { axiosFetchDynamic } from '@/http/axios/api/dynamic'

//
const nextDynamicOptions = { ssr: false }
const DynamicSlice = dynamic(() => import('./dynamicSlice'), {
  ...nextDynamicOptions
})

//
const fields: TFieldObject[] = [
  {
    typeValue: 'string',
    typeInput: 'text',
    id: 'name',
    name: 'name',
    slug: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
    description: 'Enter Name',
    required: false,
    disabled: false,
    defaultValue: '',
    typeOptions: [
      {
        name: 'min',
        defaultValue: 1,
        error: 'Name is required'
      }
    ]
  },
  {
    typeValue: 'string',
    typeInput: 'email',
    id: 'email',
    name: 'email',
    slug: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    description: 'Enter Email',
    required: false,
    disabled: false,
    defaultValue: '',
    typeOptions: [
      {
        name: 'min',
        defaultValue: 1,
        error: 'Email is required'
      }
    ]
  }
]

//
const schema = {
  name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true,
    unique: true
  }
}

//
const dataSchema = {
  schemaName: 'User',
  formName: 'users',
  schemaType: 'site',
  schema,
  fields
}

//
export default async function HomePage() {
  const { schemaName, schema } = dataSchema

  //
  const jsonSchema = JSON.stringify(schema)
  const parsedSchema = JSON.parse(jsonSchema)

  //
  const convertedSchema = convertToSchemaDefinitions(parsedSchema)
  const validate = validateSchemaDefinitions(convertedSchema)
  if (validate.length > 0) return null

  //
  const dynamicSchema = createDynamicSchema(convertedSchema)
  const dynamicModel = createDynamicModel(schemaName, dynamicSchema)
  if (!dynamicModel) return null

  //
  const dynamicDocument = await axiosFetchDynamic(schemaName)
  if (!dynamicDocument.success) return null

  //
  return (
    <div className='min-h-screen w-full bg-muted/40 px-4 pt-4'>
      <DynamicSlice schema={dataSchema} data={dynamicDocument.data} />
    </div>
  )
}
