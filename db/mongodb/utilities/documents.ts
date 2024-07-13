import {
  TFieldDocument,
  TSchemaDefinition,
  TSchemaDocument,
  TSchemaDocumentParsed,
  TTypeValues
} from '.'

//
export type TRouteReturnType = {
  success: boolean
  data?: any
  error?: { data?: any; message?: string }
  options?: { [key: string]: any; status: number }
}

//
export type TRouteFields = {
  [key: string]: any
  name: string
  type: TTypeValues
}
//

export type TRouteData = {
  [key: string]: any
}

//
export type TModelDocument = {
  [key: string]: any
  __v?: any
  _id?: any
}

//
export const validateSchemaDefinitions = (
  obj: Record<string, any>,
  level: number = 0,
  key: string = 'root'
) => {
  let errors: Array<Record<string, any>> = []

  //
  const nullish = [null, undefined, '', ' ', 'null', 'undefined']
  if ('type' in obj) {
    const hasType = !nullish.includes(obj.type)

    //
    if (!hasType) {
      const newError = { value: obj, level, key }
      errors.push(newError)
    }

    return errors
  }

  //
  for (const key in obj) {
    const value = obj[key]

    //
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedErrors = validateSchemaDefinitions(value, level + 1, key)
      errors = [...errors, ...nestedErrors]
    } else {
      //
      const hasType = !nullish.includes(value.type)

      //
      if (!hasType) {
        const newError = { value, level, key }
        errors.push(newError)
      }
    }
  }

  //
  return errors
}

//
export const validateValueType = (value: any, type: TTypeValues) => {
  let isValid = false

  //
  if (type === 'string') {
    isValid = typeof value === 'string'
  }
  if (type === 'number') {
    isValid = typeof value === 'number'
  }
  if (type === 'boolean') {
    isValid = typeof value === 'boolean'
  }
  if (type === 'array') {
    isValid = Array.isArray(value)
  }
  if (type === 'object') {
    isValid = typeof value === 'object' && !Array.isArray(value)
  }
  if (type === 'date' || type === 'datetime') {
    isValid = value instanceof Date
  }
  if (type === 'buffer') {
    isValid = Buffer.isBuffer(value)
  }

  //
  return isValid
}

//
export const validateRouteDynamicFields = (
  data: TRouteData,
  fields: TRouteFields[]
): TRouteReturnType => {
  if (!data) {
    return {
      success: false,
      error: { message: 'Data is required' },
      options: { status: 400 }
    }
  }
  const errors = []

  //
  try {
    for (const field of fields) {
      const { name, type } = field
      const value = data[name]

      //
      if (!value || !type) {
        const isValid = validateValueType(value, type)

        //
        if (!isValid) {
          errors.push({ name, type, value })
        }
      }
    }

    //
    if (errors.length > 0) {
      return {
        success: false,
        error: { data: errors, message: 'Fields has invalid types' },
        options: { status: 400 }
      }
    }

    return { success: true, options: { status: 201 } }
  } catch (error) {
    return {
      success: false,
      error: { message: 'Failed to validate fields' },
      options: { status: 500 }
    }
  }
}

//

export const formatDocument = (
  document: TModelDocument,
  parse: boolean = true
) => {
  //
  let parsed = document
  if (parse) {
    const json = JSON.stringify(document)
    parsed = JSON.parse(json)
  }

  //
  const { _id, __v, ...rest } = parsed
  const id = _id?.toString() ?? ''

  //
  return { ...rest, id }
}

//
export const formatDocuments = (
  documents: TModelDocument[],
  parse: boolean = true
) => {
  //
  let parsed = documents
  if (parse) {
    const json = JSON.stringify(documents)
    parsed = JSON.parse(json)
  }

  //
  return parsed.map((document: TModelDocument) =>
    formatDocument(document, !parse)
  )
}

//
export const getSchemaFieldValidations = (
  formFields: TFieldDocument[]
): TRouteFields[] => {
  const fields = formFields.map(d => {
    return { name: d.name, type: d.type }
  })

  return fields
}

//
export const parseSchemaDocument = (
  schemaDocument: TSchemaDocument
): TSchemaDocumentParsed => {
  const { schemaDefinition, formFields, ...rest } = schemaDocument
  let parsedSchema: TSchemaDocumentParsed = { ...rest }

  //
  const parsedSchemaDefinition = schemaDefinition
    ? (JSON.parse(schemaDefinition) as TSchemaDefinition)
    : undefined
  parsedSchema = { ...parsedSchema, schemaDefinition: parsedSchemaDefinition }

  //
  const parsedFormFields = formFields
    ? (JSON.parse(formFields) as TFieldDocument[])
    : undefined
  parsedSchema = { ...parsedSchema, formFields: parsedFormFields }

  //
  return parsedSchema
}
