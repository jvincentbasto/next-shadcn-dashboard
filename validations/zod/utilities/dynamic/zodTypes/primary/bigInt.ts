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
    return zod instanceof z.ZodBigInt
  }

  //
  const isMatch = validateInstance(zod)
  if (!isMatch) return null

  //
  if (name === 'gt') {
    zod.gt(value, { message: error })
  }
  if (name === 'gte') {
    zod.gte(value, { message: error })
  }
  if (name === 'lt') {
    zod.lt(value, { message: error })
  }
  if (name === 'lte') {
    zod.lte(value, { message: error })
  }

  //
  if (name === 'positive') {
    zod.positive({ message: error })
  }
  if (name === 'nonnegative') {
    zod.nonnegative({ message: error })
  }
  if (name === 'negative') {
    zod.negative({ message: error })
  }
  if (name === 'nonpositive') {
    zod.nonpositive({ message: error })
  }
}

//
export const setZodBigint = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const { primaryType } = formField
  const { types, typeOptions = [], typeArray } = primaryType ?? {}
  const { type: typeValue } = types ?? {}

  //
  const match = typeValue === 'bigint'
  if (!match) return null

  //
  let zodType = z.bigint()
  const defaultValue = 0

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
