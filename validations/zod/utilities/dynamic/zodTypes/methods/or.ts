import { TSecondaryTypes } from '@/db/mongodb/utilities'
import { ZodType } from 'zod'

//
export const setZodOr = <T1 extends TSecondaryTypes, T2, T3>(
  formField: T1,
  zodPrimary?: ZodType<T2>,
  zodSecondary?: ZodType<T3>
) => {
  const { typeMethod } = formField ?? {}

  //
  const match = typeMethod === 'or'
  if (!match) return null

  //
  if (!zodPrimary || !zodSecondary) return null

  //
  let zodType = zodPrimary.or(zodSecondary)
  return zodType
}

//
export const setZodOrMultiple = <T1 extends TSecondaryTypes, T2, T3>(
  formField: T1,
  zodPrimary: ZodType<T2>,
  zodSecondary: ZodType<T3>
) => {
  const { typeMethod } = formField ?? {}

  //
  const match = typeMethod === 'or'
  if (!match) return null

  //
  // let zodType = z.union(zodPrimary,...zodSecondary);

  //
  // return zodType
}
