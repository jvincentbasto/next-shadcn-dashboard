import {
  TFieldDocument,
  TSchemaDefinition,
  TSchemaDocument,
  TSchemaNameFormats
} from '../utilities'

//
export const formFields: TFieldDocument[] = [
  {
    id: 'name',
    name: 'name',
    slug: 'name',
    properties: {
      label: 'Name',
      placeholder: 'Enter Name',
      required: true
    },
    primaryType: {
      types: {
        type: 'string',
        input: 'text'
      },
      nameFormats: {
        name: 'Name',
        singular: 'Name',
        plural: 'Names',
        regex: '^[a-zA-Z0-9_]*$'
      }
    }
  },
  {
    id: 'email',
    name: 'email',
    slug: 'email',
    properties: {
      label: 'Email',
      placeholder: 'Enter Email',
      required: true
    },
    primaryType: {
      types: {
        type: 'string',
        input: 'email'
      },
      nameFormats: {
        name: 'Email',
        singular: 'Email',
        plural: 'Emails',
        regex: '^[a-zA-Z0-9_]*$'
      }
    }
  }
]

//
export const schemaDefinition: TSchemaDefinition = {
  name: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  }
}

//
export const nameFormats: TSchemaNameFormats = {
  schema: {
    name: 'User',
    singular: 'User',
    plural: 'Users'
  },
  form: {
    name: 'User',
    singular: 'User',
    plural: 'Users'
  }
}

//
export const schemaName = 'User'
export const formName = 'users'

//
export const schemaDocument: TSchemaDocument = {
  schemaType: 'site',
  schemaName,
  schemaDefinition: JSON.stringify(schemaDefinition),
  formName,
  formFields: JSON.stringify(formFields),
  nameFormats
}
