import {
  TFieldTypeOptions,
  TPrimaryType,
  TSecondaryTypes
} from '@/db/mongodb/utilities'
import { z, ZodType } from 'zod'
import { setZodDefaultOptionTypes, setZodSpecificOptionTypes } from '.'
import { setZodArray } from '../primary/array'

//
export const setZodSpecificTypeCb = <T>(
  options: TFieldTypeOptions,
  zod: ZodType<T>
) => {
  // const { name, value, error } = options

  //
  const validateInstance = (zod: unknown) => {
    return zod instanceof z.ZodAny
  }

  //
  const isMatch = validateInstance(zod)
  if (!isMatch) return null
}

//
export const setZodAny = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const { primaryType } = formField
  const { types, typeOptions = [], typeArray } = primaryType ?? {}
  const { type: typeValue } = types ?? {}

  //
  const match = typeValue === 'any'
  if (!match) return null

  //
  let zodType = z.any()
  const defaultValue = undefined

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
