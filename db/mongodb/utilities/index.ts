import { Schema } from 'mongoose'

export const zodTypeNames = [
  'string',
  'number',
  'bigint',
  'boolean',
  'date',
  'undefined',
  'null',
  'void',
  'any',
  'unknown',
  'never',
  'literal',
  'array',
  'object',
  'tuple',
  'intersection',
  'union',
  'discriminatedUnion',
  'record',
  'map',
  'set',
  'function',
  'optional',
  'nullable',
  'default',
  'catch',
  'promise',
  'lazy',
  'enum',
  'nativeEnum',
  'transformer',
  'branded'
]

//
const typeValues = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
  'enum',
  'date',
  'datetime',
  'file',
  'buffer',
  ...zodTypeNames
] as const
const typeInputs = [
  'text',
  'email',
  'number',
  'otp',
  'switch',
  'select',
  'radio',
  'checkbox',
  'textarea',
  'combobox',
  'file',
  'calendar',
  'password',
  'range',
  'hidden'
] as const
const schemaTypes = ['system', 'site'] as const
const typeMethods = ['or', 'and', 'pipe'] as const

//
export type TTypeValues = (typeof typeValues)[number] | undefined
export type TTypeInputs = (typeof typeInputs)[number] | undefined
export type TTypeMethods = (typeof typeMethods)[number] | undefined

//
export type TFieldSizes = {
  [key: string]: any
  minSize?: number
  maxSize?: number
}
export type TFieldProperties = {
  [key: string]: any
  label?: string
  placeholder?: string
  description?: string
  //
  required?: boolean
  disabled?: boolean
  //
  value?: any
  defaultValue?: any
  //
  sizes?: {
    [key: string]: any
    form?: TFieldSizes
    table?: TFieldSizes
  }
}

//
export type TFieldTypeDefaultOptions = {
  [key: string]: any
  optional?: boolean
  readonly?: boolean
  nullable?: boolean
  nullish?: boolean
  enableDefaultValue?: boolean
}
export type TFieldTypes = {
  [key: string]: any
  type: TTypeValues
  input: TTypeInputs
  //
  value?: any
  defaultValue?: any
  //
  error?: string
  options?: TFieldTypeDefaultOptions
}
export type TFieldTypeOptions = {
  [key: string]: any
  name: string
  value?: any
  error?: string
}

//
export type TArrayType = {
  [key: string]: any
  types: TFieldTypes
  typeOptions?: TFieldTypeOptions[]
}
export type TPrimaryType = {
  [key: string]: any
  types: TFieldTypes
  typeOptions?: TFieldTypeOptions[]
  typeObject?: TFieldDocument[]
  typeArray?: TArrayType
}
export type TSecondaryTypes = {
  [key: string]: any
  order: number
  typeMethod?: TTypeMethods
  //
  types: TFieldTypes
  typeOptions?: TFieldTypeOptions[]
  typeObject?: TFieldDocument[]
  typeArray?: TArrayType
}

//
export type TNameFormats = {
  [key: string]: any
  name: string
  singular?: string
  plural?: string
  regex?: string
}
export type TFieldStyles = {
  [key: string]: any
  form?: { [key: string]: any }
  table?: { [key: string]: any }
}
export type TFieldClassNames = {
  [key: string]: any
  form?: { [key: string]: any }
  table?: { [key: string]: any }
}

//
export type TFieldDocument = {
  [key: string]: any
  //
  id: string
  name: string
  slug?: string
  //
  primaryType: TPrimaryType
  secondaryTypes?: TSecondaryTypes[]
  properties?: TFieldProperties
  //
  nameFormats?: TNameFormats
  styles?: TFieldStyles
  classNames?: TFieldClassNames
}

//
export type TSchemaTypes = (typeof schemaTypes)[number]
export type TSchemaObject = {
  [key: string]: any
  type: keyof typeof Schema.Types
  required?: boolean
}
export type TSchemaDefinition = {
  [key: string]: TSchemaObject
}
export type TSchemaNameFormats = {
  schema?: TNameFormats
  form?: TNameFormats
}

//
export type TSchemaDocument = {
  [key: string]: any
  schemaType: TSchemaTypes
  schemaName: string
  schemaDefinition?: string
  //
  formName?: string
  formFields?: string
  //
  nameFormats?: TSchemaNameFormats
}
export type TSchemaDocumentParsed = {
  [key: string]: any
  schemaType: TSchemaTypes
  schemaName: string
  schemaDefinition?: TSchemaDefinition
  //
  formName?: string
  formFields?: TFieldDocument[]
  //
  nameFormats?: TSchemaNameFormats
}
