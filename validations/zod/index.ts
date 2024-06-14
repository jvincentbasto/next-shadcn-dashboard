import { ZodSchema, z } from 'zod'

//
export type TShemaFields<T> = T extends { [key: number]: infer U } ? U : never
export const getCurrentSchema = <T>(schema: ZodSchema<T>): ZodSchema<T> =>
  schema

//
export const zodUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required')
})

//
export const zodUserSchemaFields = zodUserSchema.keyof().options
export type TZodUserSchemaFields = TShemaFields<typeof zodUserSchemaFields>
