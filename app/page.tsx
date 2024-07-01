import { Metadata } from 'next'
import { axiosFetchUsers } from '@/http/axios/api/users'
import dynamic from 'next/dynamic'
import {
  convertToSchemaDefinitions,
  createDynamicModel,
  createDynamicSchema,
  validateSchemaDefinitions
} from '@/db/mongodb/models/dynamic'

//
const UserTest = dynamic(() => import('./UserTest'))

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
const sample = {
  name: { type: 'String', required: true },
  email: { type: 'String', required: true, unique: true },
  age: { type: 'Number', min: 0 },
  isActive: { type: 'Boolean', default: true },
  address: {
    street: { type: 'String' },
    city: { type: 'String' },
    state: { type: 'String' },
    zip: { type: 'Number' }
  }
}
const schemaDefinition = JSON.stringify(sample)
const parsedSchemaDefinition = JSON.parse(schemaDefinition)

//
export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page'
}

//
export default async function RootPage() {
  const users = await axiosFetchUsers()

  if (!users.success) return null

  const converted = convertToSchemaDefinitions(parsedSchemaDefinition)
  const validate = validateSchemaDefinitions(converted)
  const schema = createDynamicSchema(converted)
  const model = createDynamicModel('SampleUser', schema)

  if (!model) return null

  //
  return <UserTest data={users.data} />
  // return <p>Home Page</p>
}
