import { TSecondaryTypes } from '@/db/mongodb/utilities'
import { z } from 'zod'

//
export const setZodAnd = <
  T1 extends TSecondaryTypes,
  T2 extends z.ZodObject<any>,
  T3 extends z.ZodObject<any>
>(
  formField: T1,
  zodPrimary: T2,
  zodSecondary: T3
) => {
  const { typeMethod } = formField ?? {}

  //
  const match = typeMethod === 'and'
  if (!match) return null

  //
  const matchedPrimary = zodPrimary instanceof z.ZodObject
  const matchedSecondary = zodSecondary instanceof z.ZodObject
  if (!matchedPrimary || !matchedSecondary) return null

  //
  let zodType = zodPrimary.and(zodSecondary)
  return zodType
}

//
export const setZodAndMultiple = <
  T1 extends TSecondaryTypes,
  T2 extends z.ZodObject<any>,
  T3 extends z.ZodObject<any>[]
>(
  formField: T1,
  zodPrimary: T2,
  zodSecondary: T3
) => {
  const { typeMethod } = formField ?? {}

  //
  const match = typeMethod === 'and'
  if (!match) return null

  // let zodType = z.intersection(zodPrimary,...zodSecondary);

  //
  // return zodType
}
