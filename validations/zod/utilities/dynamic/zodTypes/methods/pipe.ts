import { TSecondaryTypes } from '@/db/mongodb/utilities'
import { ZodType } from 'zod'

//
export const setZodPipe = <T1 extends TSecondaryTypes, T2, T3>(
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
  let zodType = zodPrimary.pipe(zodSecondary)
  return zodType
}
