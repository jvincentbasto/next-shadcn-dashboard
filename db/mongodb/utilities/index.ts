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

//
export type TTypeValues = (typeof typeValues)[number] | undefined
export type TTypeInputs = (typeof typeInputs)[number] | undefined

//
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
}

//
export type TFieldTypes = {
  [key: string]: any
  type: TTypeValues
  input: TTypeInputs
  value?: any
  error?: string
}
export type TFieldTypeOptions = {
  [key: string]: any
  name: string
  value?: any
  error?: string
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
  types: TFieldTypes
  typeOptions?: TFieldTypeOptions[]
  properties?: TFieldProperties
  //
  nameFormats?: TNameFormats
  styles?: TFieldStyles
  classNames?: TFieldClassNames
  //
  component?: string
  children?: TFieldDocument[]
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
