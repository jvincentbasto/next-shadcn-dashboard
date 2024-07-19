import { setByZodMethods } from './dynamic/zodTypes/methods/index'
import {
  TFieldDocument,
  TPrimaryType,
  TSecondaryTypes
} from '@/db/mongodb/utilities'
import { z, ZodObject } from 'zod'
import { setZodString } from './dynamic/zodTypes/primary/string'
import { setZodNumber } from './dynamic/zodTypes/primary/number'
import { setZodBigint } from './dynamic/zodTypes/primary/bigInt'
import { setZodBoolean } from './dynamic/zodTypes/primary/boolean'
import { setZodDate } from './dynamic/zodTypes/primary/date'
import { setZodSymbol } from './dynamic/zodTypes/primary/symbol'
import { setZodEnum } from './dynamic/zodTypes/primary/enum'
import { setZodNan } from './dynamic/zodTypes/optional/nan'
import { setZodUndefined } from './dynamic/zodTypes/optional/undefined'
import { setZodNull } from './dynamic/zodTypes/optional/null'
import { setZodVoid } from './dynamic/zodTypes/optional/void'
import { setZodAny } from './dynamic/zodTypes/optional/any'
import { setZodUnknown } from './dynamic/zodTypes/optional/unknown'
import { setZodNever } from './dynamic/zodTypes/optional/never'
import { sortBy } from 'lodash'
import { setZodObject } from './dynamic/zodTypes/primary/object'

// ##########
export const getZodObjectKeys = (schema: ZodObject<any>) => {
  return schema.keyof().options
}

// ##########
export const setZodByTypes = <T extends TPrimaryType | TSecondaryTypes>(
  formField: T
) => {
  const { types } = formField
  const { type } = types
  let zod

  // primary
  if (type === 'string') {
    zod = setZodString(formField) ?? zod
    zod = setZodSymbol(formField) ?? zod
  }
  if (type === 'number') {
    zod = setZodNumber(formField) ?? zod
    zod = setZodBigint(formField) ?? zod
  }
  if (type === 'boolean') {
    zod = setZodBoolean(formField) ?? zod
  }
  if (type === 'date' || type === 'datetime') {
    zod = setZodDate(formField) ?? zod
  }
  if (type === 'enum') {
    zod = setZodEnum(formField) ?? zod
  }
  if (type === 'object') {
    zod = setZodObject(formField) ?? zod
  }

  //
  if (type === 'any') {
    zod = setZodAny(formField) ?? zod
  }
  if (type === 'unknown') {
    zod = setZodUnknown(formField) ?? zod
  }
  if (type === 'nan') {
    zod = setZodNan(formField) ?? zod
  }

  //
  if (type === 'undefined') {
    zod = setZodUndefined(formField) ?? zod
  }
  if (type === 'null') {
    zod = setZodNull(formField) ?? zod
  }

  //
  if (type === 'void') {
    zod = setZodVoid(formField) ?? zod
  }
  if (type === 'never') {
    zod = setZodNever(formField) ?? zod
  }

  //
  return zod
}

//
export const mapZodSecondaryTypes = <
  T1 extends TPrimaryType,
  T2 extends TSecondaryTypes
>(
  primaryType: T1,
  secondaryTypes: T2[] = []
) => {
  const sortedSecondaryTypes = sortBy(secondaryTypes, 'order')
  let zod

  //
  const zodPrimaryType = setZodByTypes(primaryType)
  const zodSecondaryTypes = sortedSecondaryTypes.map(type => {
    return { ...type, zodType: setZodByTypes(type) }
  })

  //
  zod = zodPrimaryType
  for (const type of zodSecondaryTypes) {
    zod = setByZodMethods(type, zodPrimaryType, type.zodType)
  }

  //
  return zod
}

//
export const mapZodValues = (formField: TFieldDocument) => {
  const { name, primaryType, secondaryTypes = [] } = formField
  let zod = mapZodSecondaryTypes(primaryType, secondaryTypes)

  //
  const zodObject = name && zod ? { name, value: zod } : null
  return zodObject
}

// ##########
export const setZodDocument = (fields: TFieldDocument[] = []) => {
  let zodObject = {}

  //
  const zodFields = fields.map(data => mapZodValues(data))
  for (const obj of zodFields) {
    if (!obj) continue
    zodObject = { ...zodObject, [obj.name]: obj.value }
  }

  //
  return z.object(zodObject)
}

// ##########
export const setZodDefaultValues = (formFields: TFieldDocument[]) => {
  let defaultValues: { [key: string]: any } = {}

  //
  const setDefaultValues = (formField: TPrimaryType) => {
    const { types, typeObject = [] } = formField ?? {}
    const { type: typeValue, value, defaultValue } = types ?? {}

    //
    let newValue
    const getValue = (val?: any) => value ?? defaultValue ?? val

    //
    if (typeValue === 'string') {
      newValue = getValue('')
    }
    if (typeValue === 'number') {
      newValue = getValue(0)
    }
    if (typeValue === 'boolean') {
      newValue = getValue(false)
    }
    if (typeValue === 'date' || typeValue === 'datetime') {
      newValue = getValue(new Date())
    }

    //
    if (typeValue === 'array') {
      newValue = getValue([])
    }
    if (typeValue === 'object') {
      const object = setZodDefaultValues(typeObject) ?? {}
      newValue = getValue(object)
    }

    //
    return newValue
  }

  //
  for (const field of formFields) {
    const { name, primaryType } = field

    //
    if (!name) continue
    const value = setDefaultValues(primaryType)
    defaultValues = { ...defaultValues, [name]: value }
  }

  return defaultValues
}
