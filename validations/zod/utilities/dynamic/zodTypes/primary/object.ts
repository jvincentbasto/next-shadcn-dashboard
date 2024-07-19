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
import { mapZodValues } from '../../..'

//
export const setZodSpecificTypeCb = <T>(
  options: TFieldTypeOptions,
  zod: ZodType<T>
) => {
  // const { name, value, error } = options

  //
  const validateInstance = (zod: unknown) => {
    return zod instanceof z.ZodObject
  }

  //
  const isMatch = validateInstance(zod)
  if (!isMatch) return null
}

//
export const setZodObject = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const {
    types,
    typeOptions = [],
    typeArray,
    typeObject = []
  } = formField ?? {}
  const { type: typeValue } = types ?? {}

  //
  let zodObject = {}
  const zodFields = typeObject.map(data => mapZodValues(data))
  for (const obj of zodFields) {
    if (!obj) continue
    zodObject = { ...zodObject, [obj.name]: obj.value }
  }

  //
  const match = typeValue === 'object'
  if (!match) return null

  //
  let zodType = z.object(zodObject)
  const defaultValue = {}

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
