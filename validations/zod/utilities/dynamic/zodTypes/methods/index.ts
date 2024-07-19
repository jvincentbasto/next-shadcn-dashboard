import { TSecondaryTypes } from '@/db/mongodb/utilities'
import { z, ZodType } from 'zod'
import { setZodOr } from './or'
import { setZodAnd } from './and'
import { setZodPipe } from './pipe'

//
export const setByZodMethods = <T1 extends TSecondaryTypes, T2, T3>(
  formField: T1,
  zodPrimary?: ZodType<T2>,
  zodSecondary?: ZodType<T3>
) => {
  const { typeMethod } = formField ?? {}

  if (!zodPrimary || !zodSecondary) return null

  //
  if (typeMethod === 'or') {
    return setZodOr(formField, zodPrimary, zodSecondary)
  }
  if (typeMethod === 'and') {
    const matchedPrimary = zodPrimary instanceof z.ZodObject
    const matchedSecondary = zodSecondary instanceof z.ZodObject

    //
    if (matchedPrimary && matchedSecondary) {
      return setZodAnd(formField, zodPrimary, zodSecondary)
    }
  }
  if (typeMethod === 'pipe') {
    return setZodPipe(formField, zodPrimary, zodSecondary)
  }

  //
  return zodPrimary
}
