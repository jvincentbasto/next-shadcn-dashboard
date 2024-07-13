import { TFieldDocument } from '@/db/mongodb/utilities'
import { z, ZodObject } from 'zod'

//
export const getZodObjectKeys = (schema: ZodObject<any>) => {
  return schema.keyof().options
}

// ##########
export const setZodString = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'string'
  if (!match) return null

  //
  let zodType = z.string()
  for (const options of typeOptions) {
    const { name, value, error } = options

    //
    if (name === 'min') {
      zodType.min(value, { message: error })
    }
    if (name === 'max') {
      zodType.max(value, { message: error })
    }
    if (name === 'length') {
      zodType.length(value, { message: error })
    }

    //
    if (name === 'email') {
      zodType.email({ message: error })
    }
    if (name === 'url') {
      zodType.url({ message: error })
    }
    if (name === 'emoji') {
      zodType.emoji({ message: error })
    }

    //
    if (name === 'uuid') {
      zodType.uuid({ message: error })
    }

    //
    if (name === 'regex') {
      zodType.regex(value, { message: error })
    }
    if (name === 'includes') {
      zodType.includes(value, { message: error, position: 0 })
    }
    if (name === 'startsWith') {
      zodType.startsWith(value, { message: error })
    }
    if (name === 'endsWith') {
      zodType.endsWith(value, { message: error })
    }

    //
    if (name === 'trim') {
      zodType.trim()
    }
    if (name === 'toLowerCase') {
      zodType.toLowerCase()
    }
    if (name === 'toUpperCase') {
      zodType.toUpperCase()
    }
  }

  //
  return zodType
}

//
export const setZodNumber = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'number'
  if (!match) return null

  //
  let zodType = z.number()
  for (const options of typeOptions) {
    const { name, value, error } = options

    //
    if (name === 'gt') {
      zodType.gt(value, { message: error })
    }
    if (name === 'gte') {
      zodType.gte(value, { message: error })
    }
    if (name === 'lt') {
      zodType.lt(value, { message: error })
    }
    if (name === 'lte') {
      zodType.lte(value, { message: error })
    }

    //
    if (name === 'int') {
      zodType.int({ message: error })
    }

    //
    if (name === 'positive') {
      zodType.positive({ message: error })
    }
    if (name === 'nonnegative') {
      zodType.nonnegative({ message: error })
    }
    if (name === 'negative') {
      zodType.negative({ message: error })
    }
    if (name === 'nonpositive') {
      zodType.nonpositive({ message: error })
    }

    //
    if (name === 'finite') {
      zodType.finite({ message: error })
    }
    if (name === 'safe') {
      zodType.safe({ message: error })
    }
  }

  //
  return zodType
}

//
export const setZodBigint = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'bigint'
  if (!match) return null

  //
  let zodType = z.bigint()
  for (const options of typeOptions) {
    const { name, value, error } = options

    //
    if (name === 'gt') {
      zodType.gt(value, { message: error })
    }
    if (name === 'gte') {
      zodType.gte(value, { message: error })
    }
    if (name === 'lt') {
      zodType.lt(value, { message: error })
    }
    if (name === 'lte') {
      zodType.lte(value, { message: error })
    }

    //
    if (name === 'positive') {
      zodType.positive({ message: error })
    }
    if (name === 'nonnegative') {
      zodType.nonnegative({ message: error })
    }
    if (name === 'negative') {
      zodType.negative({ message: error })
    }
    if (name === 'nonpositive') {
      zodType.nonpositive({ message: error })
    }
  }

  //
  return zodType
}

//
export const setZodBoolean = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'boolean'
  if (!match) return null

  //
  let zodType = z.boolean()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodDate = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'date'
  if (!match) return null

  //
  let zodType = z.date()
  for (const options of typeOptions) {
    const { name, value, error } = options

    //
    if (name === 'min') {
      zodType.min(value, { message: error })
    }
    if (name === 'max') {
      zodType.max(value, { message: error })
    }
  }

  //
  return zodType
}

//
export const setZodSymbol = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'symbol'
  if (!match) return null

  //
  let zodType = z.symbol()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

// ##########
export const setZodEnum = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue, value } = types

  //
  const match = typeValue === 'enum'
  if (!match) return null

  //
  let zodType = z.enum(value) ?? null
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

// ##########
export const setZodNan = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'nan'
  if (!match) return null

  //
  let zodType = z.nan()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodUndefined = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'undefined'
  if (!match) return null

  //
  let zodType = z.undefined()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodNull = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'null'
  if (!match) return null

  //
  let zodType = z.null()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodVoid = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'void'
  if (!match) return null

  //
  let zodType = z.void()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

// ##########
export const setZodAny = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'any'
  if (!match) return null

  //
  let zodType = z.any()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodUnknown = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'unknown'
  if (!match) return null

  //
  let zodType = z.unknown()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

//
export const setZodNever = (formField: TFieldDocument) => {
  const { types, typeOptions = [] } = formField
  const { type: typeValue } = types

  //
  const match = typeValue === 'never'
  if (!match) return null

  //
  let zodType = z.never()
  for (const options of typeOptions) {
    const { name, value, error } = options
  }

  //
  return zodType
}

// ##########
export const setZodFields = (formField: TFieldDocument) => {
  const { name } = formField
  let zod

  // primitives
  zod = setZodString(formField) ?? zod
  zod = setZodNumber(formField) ?? zod
  zod = setZodBigint(formField) ?? zod
  zod = setZodBoolean(formField) ?? zod
  zod = setZodDate(formField) ?? zod
  zod = setZodSymbol(formField) ?? zod

  //
  zod = setZodNan(formField) ?? zod
  zod = setZodUndefined(formField) ?? zod
  zod = setZodNull(formField) ?? zod
  zod = setZodVoid(formField) ?? zod

  //
  zod = setZodAny(formField) ?? zod
  zod = setZodUnknown(formField) ?? zod

  //
  zod = setZodNever(formField) ?? zod

  //
  const zodObject = name && zod ? { name, value: zod } : null
  return zodObject
}

//
export const setZodObject = (list: TFieldDocument[] = []) => {
  let zodObject = {}

  //
  const zodFields = list.map(data => setZodFields(data))
  for (const obj of zodFields) {
    if (!obj) continue
    zodObject = { ...zodObject, [obj.name]: obj.value }
  }

  //
  return z.object(zodObject)
}

//
export const setZodDefaultValues = (formFields: TFieldDocument[]) => {
  let defaultValues: { [key: string]: any } = {}

  //
  for (const field of formFields) {
    const { name, properties } = field
    const { defaultValue } = properties ?? {}

    //
    if (!name) continue
    defaultValues = { ...defaultValues, [name]: defaultValue }
  }

  return defaultValues
}
