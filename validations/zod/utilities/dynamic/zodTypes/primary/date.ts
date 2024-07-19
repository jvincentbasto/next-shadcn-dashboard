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
    return zod instanceof z.ZodDate
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
}

//
export const setZodDate = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const { primaryType } = formField
  const { types, typeOptions = [], typeArray } = primaryType ?? {}
  const { type: typeValue } = types ?? {}

  //
  const match = typeValue === 'date'
  if (!match) return null

  //
  let zodType = z.date()
  const defaultValue = Date.now()

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
