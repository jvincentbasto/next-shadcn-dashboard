import { TFieldTypeOptions, TFieldTypes } from '@/db/mongodb/utilities'
import { ZodType } from 'zod'

//
export const setZodSecondaryTypes = <T>(zod?: ZodType<T>) => {
  //
  if (!zod) return null
}

//
export const setZodDefaultOptionTypes = <T>(
  types?: TFieldTypes,
  zod?: ZodType<T>,
  defaultValue: any = null
) => {
  const { value, options } = types ?? {}

  //
  const {
    optional = true,
    nullable,
    nullish,
    readonly,
    enableDefaultValue = true
  } = options ?? {}

  //
  if (!options || !zod) return null

  //
  if (optional) {
    // undefined
    zod.optional()
  }
  if (nullable) {
    // null
    zod.nullable()
  }
  if (nullish) {
    // undefined | null
    zod.nullish()
  }
  if (readonly) {
    // readonly
    zod.readonly()
  }
  if (enableDefaultValue) {
    // default
    const currentValue = value ?? defaultValue
    if (currentValue) {
      zod.default(value ?? defaultValue)
    }
  }
}

//
export const setZodSpecificOptionTypes = <T>(
  typeOptions: TFieldTypeOptions[] = [],
  cb?: <T>(options: TFieldTypeOptions, zod: ZodType<T>) => void,
  zod?: ZodType<T>
) => {
  //
  for (const options of typeOptions) {
    //
    if (cb && zod) {
      cb(options, zod)
    }
  }
}
