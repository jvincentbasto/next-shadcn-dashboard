import { TFieldObject } from '@/components/custom/forms/inputs/CustomFormFields'
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

//
export const setZodObject = (list: TFieldObject[] = []) => {
  let zodObject = {}

  //
  const zodList = list.map(data => {
    const { name, typeValue, typeOptions = [] } = data
    let zod

    //
    if (typeValue === 'string') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
        if (name === 'max') {
          zodType.max(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'number') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'boolean') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'array') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'enum') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'object') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'datetime') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    if (typeValue === 'file') {
      let zodType = z.string()

      //
      for (const options of typeOptions) {
        const { name, value, error } = options

        //
        if (name === 'min') {
          zodType.min(value, error)
        }
      }
      zod = zodType
    }

    //
    const zodObject = name && zod ? { name, value: zod } : null
    return zodObject
  })

  //
  for (const obj of zodList) {
    if (!obj) continue
    zodObject = { ...zodObject, [obj.name]: obj.value }
  }

  //
  return z.object(zodObject)
}
