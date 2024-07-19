import {
  TFieldTypeOptions,
  TPrimaryType,
  TSecondaryTypes
} from '@/db/mongodb/utilities'
import { z, ZodType } from 'zod'
import {
  setZodDefaultOptionTypes,
  setZodSpecificOptionTypes
} from '../optional'
import { setZodArray } from './array'

//
export const setZodSpecificTypeCb = <T>(
  options: TFieldTypeOptions,
  zod: ZodType<T>
) => {
  const { name, value, error } = options

  //
  const validateInstance = (zod: unknown) => {
    return zod instanceof z.ZodString
  }

  //
  const isMatch = validateInstance(zod)
  if (!isMatch) return null

  //
  if (name === 'min') {
    zod.min(value, { message: error })
  }
  if (name === 'max') {
    zod.max(value, { message: error })
  }
  if (name === 'length') {
    zod.length(value, { message: error })
  }

  //
  if (name === 'email') {
    zod.email({ message: error })
  }
  if (name === 'url') {
    zod.url({ message: error })
  }
  if (name === 'emoji') {
    zod.emoji({ message: error })
  }

  //
  if (name === 'uuid') {
    zod.uuid({ message: error })
  }

  //
  if (name === 'regex') {
    zod.regex(value, { message: error })
  }
  if (name === 'includes') {
    zod.includes(value, { message: error, position: 0 })
  }
  if (name === 'startsWith') {
    zod.startsWith(value, { message: error })
  }
  if (name === 'endsWith') {
    zod.endsWith(value, { message: error })
  }

  //
  if (name === 'trim') {
    zod.trim()
  }
  if (name === 'toLowerCase') {
    zod.toLowerCase()
  }
  if (name === 'toUpperCase') {
    zod.toUpperCase()
  }
}

//
export const setZodString = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const { types, typeOptions = [], typeArray } = formField ?? {}
  const { type: typeValue } = types ?? {}

  //
  const match = typeValue === 'string'
  if (!match) return null

  //
  let zodType = z.string()
  const defaultValue = ''

  //
  setZodDefaultOptionTypes(types, zodType, defaultValue)
  setZodSpecificOptionTypes(typeOptions, setZodSpecificTypeCb, zodType)

  //
  if (typeArray) {
    setZodArray(typeArray, zodType)
  }

  //
  return zodType
}
