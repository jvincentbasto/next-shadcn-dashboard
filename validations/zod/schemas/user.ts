import { z } from 'zod'
import { getZodObjectKeys } from '../utilities'

//
export const zodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required')
})

//
export const zodFields = getZodObjectKeys(zodSchema)
export type TZodFields = (typeof zodFields)[number]
