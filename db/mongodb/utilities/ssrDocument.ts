import { Schema, SchemaTypeOptions, model, models } from 'mongoose'
import { TRouteReturnType } from './documents'

//
export const convertToSchemaDefinitions = (
  obj: Record<string, any>
): Record<string, SchemaTypeOptions<any>> => {
  let schemaDefinitions: Record<string, SchemaTypeOptions<any>> = {}

  //
  if ('type' in obj) {
    const typeValue = obj.type as keyof typeof Schema.Types
    const type = Schema.Types[typeValue]

    //
    return { ...obj, type }
  }

  //
  for (const key in obj) {
    const value = obj[key]

    //
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      schemaDefinitions[key] = convertToSchemaDefinitions(value)
    } else {
      //
      const typeValue = value.type as keyof typeof Schema.Types
      const type = Schema.Types[typeValue]

      //
      schemaDefinitions[key] = {
        ...value,
        type
      }
    }
  }

  //
  return schemaDefinitions
}

//
export const validateSchemaDefinitions = (
  obj: Record<string, any>,
  level: number = 0,
  key: string = 'root'
) => {
  let errors: Array<Record<string, any>> = []

  //
  const nullish = [null, undefined, '', ' ', 'null', 'undefined']
  if ('type' in obj) {
    const hasType = !nullish.includes(obj.type)

    //
    if (!hasType) {
      const newError = { value: obj, level, key }
      errors.push(newError)
    }

    return errors
  }

  //
  for (const key in obj) {
    const value = obj[key]

    //
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedErrors = validateSchemaDefinitions(value, level + 1, key)
      errors = [...errors, ...nestedErrors]
    } else {
      //
      const hasType = !nullish.includes(value.type)

      //
      if (!hasType) {
        const newError = { value, level, key }
        errors.push(newError)
      }
    }
  }

  //
  return errors
}

//
export const createDynamicSchema = (schemaDefinition: any) => {
  if (!schemaDefinition) {
    return null
  }

  //
  try {
    const newSchema = new Schema(schemaDefinition)
    return newSchema
  } catch (error) {
    return null
  }
}

//
export const createDynamicModel = (schemaName: string, schema: any) => {
  if (!schemaName) return null

  //
  let dynamicModel
  try {
    dynamicModel = models[schemaName] || model(schemaName)

    //
    return dynamicModel
  } catch (error) {
    if (!schema) return null
    dynamicModel = model(schemaName, schema)

    //
    return dynamicModel ?? null
  }
}

//
export const createRouteDynamicSchema = (
  schemaDefinition: string
): TRouteReturnType => {
  //
  if (!schemaDefinition) {
    return {
      success: false,
      error: {
        message: 'Schema definition is required'
      },
      options: { status: 400 }
    }
  }

  //
  let schema
  try {
    const parsed = JSON.parse(schemaDefinition)
    const converted = convertToSchemaDefinitions(parsed)

    //
    const errors = validateSchemaDefinitions(converted)
    const hasErrors = errors.length > 0

    //
    if (hasErrors) {
      return {
        success: false,
        error: { data: errors, message: 'Invalid schema definition' },
        options: { status: 400 }
      }
    }

    //
    schema = createDynamicSchema(converted)
    return { success: true, data: schema, options: { status: 200 } }
  } catch (error) {
    return {
      success: false,
      error: { message: 'Failed to create schema' },
      options: { status: 500 }
    }
  }
}

//
export const createRouteDynamicModel = (
  modelName: string,
  schemaDefinition: string
): TRouteReturnType => {
  //
  if (!modelName) {
    return {
      success: false,
      error: {
        message: 'Model Name is required'
      },
      options: { status: 400 }
    }
  }

  //
  let dynamicModel
  try {
    dynamicModel = models[modelName] || model(modelName)

    //
    return { success: true, data: dynamicModel, options: { status: 200 } }
  } catch (error) {
    //
    const schema = createRouteDynamicSchema(schemaDefinition)
    const { success, data } = schema
    if (!success) return schema

    //
    dynamicModel = createDynamicModel(modelName, data)
    if (dynamicModel) {
      return { success: true, data: dynamicModel, options: { status: 200 } }
    }

    //
    return {
      success: false,
      error: { message: 'Failed to create model' },
      options: { status: 500 }
    }
  }
}

//
export const getRouteDynamicModel = (modelName: string): TRouteReturnType => {
  //
  if (!modelName) {
    return {
      success: false,
      error: {
        message: 'Model Name is required'
      },
      options: { status: 400 }
    }
  }

  //
  let dynamicModel
  try {
    dynamicModel = models[modelName] || model(modelName)

    //
    if (!dynamicModel) {
      return {
        success: false,
        error: { message: 'Model not found' },
        options: { status: 404 }
      }
    }

    //
    return { success: true, data: dynamicModel, options: { status: 200 } }
  } catch (error) {
    return {
      success: false,
      error: { message: 'Failed to get model' },
      options: { status: 500 }
    }
  }
}
