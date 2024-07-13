import {
  TFieldDocument,
  TSchemaDefinition,
  TSchemaDocument,
  TSchemaNameFormats
} from '../utilities'

//
export const formFields: TFieldDocument[] = [
  {
    id: 'schemaType',
    name: 'schemaType',
    slug: 'schemaType',
    properties: {
      label: 'Schema Type',
      placeholder: 'Enter schema type',
      required: true
    },
    types: {
      type: 'string',
      input: 'text'
    },
    nameFormats: {
      name: 'Schema Type',
      singular: 'Schema Type',
      plural: 'Schema Types',
      regex: '^[a-zA-Z0-9_]*$'
    }
  },
  {
    id: 'schemaName',
    name: 'schemaName',
    slug: 'schemaName',
    properties: {
      label: 'Schema Name',
      placeholder: 'Enter schema name',
      required: true
    },
    types: {
      type: 'string',
      input: 'text'
    },
    nameFormats: {
      name: 'Schema Name',
      singular: 'Schema Name',
      plural: 'Schema Names',
      regex: '^[a-zA-Z0-9_]*$'
    }
  },
  {
    id: 'schemaDefinition',
    name: 'schemaDefinition',
    slug: 'schemaDefinition',
    properties: {
      label: 'Schema Definition',
      placeholder: 'Enter schema definition',
      required: true
    },
    types: {
      type: 'string',
      input: 'text'
    },
    nameFormats: {
      name: 'Schema Definition',
      singular: 'Schema Definition',
      plural: 'Schema Definitions',
      regex: '^[a-zA-Z0-9_]*$'
    }
  },
  {
    id: 'formName',
    name: 'formName',
    slug: 'formName',
    properties: {
      label: 'Form Name',
      placeholder: 'Enter form name',
      required: true
    },
    types: {
      type: 'string',
      input: 'text'
    },
    nameFormats: {
      name: 'Form Name',
      singular: 'Form Name',
      plural: 'Form Names',
      regex: '^[a-zA-Z0-9_]*$'
    }
  },
  {
    id: 'formFields',
    name: 'formFields',
    slug: 'formFields',
    properties: {
      label: 'Form Fields',
      placeholder: 'Enter form fields',
      required: true
    },
    types: {
      type: 'string',
      input: 'text'
    },
    nameFormats: {
      name: 'Form Fields',
      singular: 'Form Fields',
      plural: 'Form Fields',
      regex: '^[a-zA-Z0-9_]*$'
    }
  }
]

//
export const schemaDefinition: TSchemaDefinition = {
  schemaType: {
    type: 'String',
    required: true
  },
  schemaName: {
    type: 'String',
    required: true
  },
  schemaDefinition: {
    type: 'String'
  },
  formName: {
    type: 'String',
    required: true
  },
  formFields: {
    type: 'String'
  }
}

//
export const nameFormats: TSchemaNameFormats = {
  schema: {
    name: 'Project Schema',
    singular: 'Project Schema',
    plural: 'Project Schemas'
  },
  form: {
    name: 'Project Schema',
    singular: 'Project Schema',
    plural: 'Project Schemas'
  }
}

//
export const schemaName = 'ProjectSchema'
export const formName = 'projectSchemas'

//
export const schemaDocument: TSchemaDocument = {
  schemaType: 'system',
  schemaName,
  schemaDefinition: JSON.stringify(schemaDefinition),
  formName,
  formFields: JSON.stringify(formFields),
  nameFormats
}
