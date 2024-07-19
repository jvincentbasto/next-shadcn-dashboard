import { TArrayType, TFieldTypeOptions } from '@/db/mongodb/utilities'
import { z, ZodType } from 'zod'
import {
  setZodDefaultOptionTypes,
  setZodSpecificOptionTypes
} from '../optional'

//
export const setZodSpecificTypeCb = <T>(
  options: TFieldTypeOptions,
  zod: ZodType<T>
) => {
  const { name, value, error } = options

  //
  const validateInstance = (zod: unknown) => {
    return zod instanceof z.ZodArray
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
}

//
export const setZodArray = <T>(typeArray: TArrayType, zod?: ZodType<T>) => {
  const { types, typeOptions = [] } = typeArray ?? {}
  const { type: typeValue } = types ?? {}

  //
  const match = typeValue === 'array'
  if (!match || !zod) return null

  //
  let zodType = z.array(zod)
  const defaultValue = ['']

  //
  setZodDefaultOptionTypes(types, zodType, defaultValue)
  setZodSpecificOptionTypes(typeOptions, setZodSpecificTypeCb, zodType)

  //
  return zodType
}
