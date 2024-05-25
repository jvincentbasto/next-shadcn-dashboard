//
// ##############################
// * ########## Constants
// ##############################
//

// * ##############################
// * Primitive Types
type InferStringType<T> = T extends string ? string : never
type InferNumberType<T> = T extends number ? number : never
type InferBooleanType<T> = T extends boolean ? boolean : never

// * ##############################
// * Reference Types
type InferArrayType<T> = T extends (infer U)[] ? U[] : never
type InferTupleType<T> = T extends [infer U, ...infer T] ? [U, ...T] : never
type InferFunctionType<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => R
  : never
type InferObjectType<T> = T extends object
  ? { -readonly [K in keyof T]: InferType<T[K]> }
  : never

// * ##############################
// * PURPOSE: Get General Types
type InferType<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends (...args: infer P) => infer R
        ? (...args: P) => R
        : T extends object
          ? { -readonly [K in keyof T]: InferType<T[K]> }
          : never

// * ##############################
type ObjectKeys<T> = keyof T
type ObjectValues<T> = T[keyof T]

// * ##############################
// * SAMPLE: Constant Values
const sampleString = 'string'
const sampleNumber = 1
const sampleBoolean = true as const
const sampleStringArray = ['string1', 'string2', 'string3'] as const
const sampleNumberArray = [1, 2, 3] as const
const sampleBooleanArray = [true, false] as const
const sampleTuple = ['string', 1, true] as const
const sampleFunction =
  (arg1: string, arg2: number, arg3: boolean) =>
  (
    list1: string[] = [arg1],
    list2: number[] = [arg2],
    list3: boolean[] = [arg3]
  ) => {
    return {
      arg1,
      arg2,
      arg3,
      list1,
      list2,
      list3,
      tuple: [arg1, arg2, arg3]
    }
  }

const obj = {
  sampleString,
  sampleNumber,
  sampleBoolean,
  sampleStringArray,
  sampleNumberArray,
  sampleBooleanArray,
  sampleTuple,
  sampleFunction
} as const

// ##############################
// * SAMPLE: Unconstant Values
const unconstString = sampleString
const unconstNumber = sampleNumber
const unconstBoolean = sampleBoolean
const unconstStringArray = [...sampleStringArray]
const unconstNumberArray = [...sampleNumberArray]
const unconstBooleanArray = [...sampleBooleanArray]
const unconstTuple = [...sampleTuple]
const unconstSampleFunction = sampleFunction
let unconstObj = {
  obj: {
    ...obj,
    sampleStringArray: [...obj.sampleStringArray],
    sampleNumberArray: [...obj.sampleNumberArray],
    sampleBooleanArray: [...obj.sampleBooleanArray],
    sampleTuple: [...obj.sampleTuple]
  }
}

// ##############################
// * SAMPLE: Get Type By Type Inference
type typeString = InferStringType<typeof unconstString>
type typeNumber = InferNumberType<typeof unconstNumber>
type typeBoolean = InferBooleanType<typeof unconstBoolean>
type typeStringArray = InferObjectType<typeof unconstStringArray>
type typeNumberArray = InferObjectType<typeof unconstNumberArray>
type typeBooleanArray = InferArrayType<typeof unconstBooleanArray>
type typeTuple = InferObjectType<typeof unconstTuple>
type typeFunction = InferFunctionType<typeof unconstSampleFunction>
type typeObject = InferObjectType<typeof unconstObj>

// * ##############################
// * SAMPLE: Get Property Type By Type Inference
type typeObjString = InferStringType<typeof unconstObj.obj.sampleString>
type typeObjNumber = InferNumberType<typeof unconstObj.obj.sampleNumber>
type typeObjBoolean = InferBooleanType<typeof unconstObj.obj.sampleBoolean>
type typeObjStringArray = InferObjectType<
  typeof unconstObj.obj.sampleStringArray
>
type typeObjNumberArray = InferObjectType<
  typeof unconstObj.obj.sampleNumberArray
>
type typeObjBooleanArray = InferArrayType<
  typeof unconstObj.obj.sampleBooleanArray
>
type typeObjTuple = InferObjectType<typeof unconstObj.obj.sampleTuple>
type typeObjFunction = InferFunctionType<typeof unconstObj.obj.sampleFunction>
type typeObjObject = InferObjectType<typeof unconstObj>

// * ##############################
// * SAMPLE: Get Property Type By Mulitiple Type Inferences
type inferTypeString = InferType<typeof unconstObj.obj.sampleString>
type inferTypeNumber = InferType<typeof unconstObj.obj.sampleNumber>
type inferTypeBoolean = InferType<typeof unconstObj.obj.sampleBoolean>
type inferTypeStringArray = InferType<typeof unconstObj.obj.sampleStringArray>
type inferTypeNumberArray = InferType<typeof unconstObj.obj.sampleNumberArray>
type inferTypeBooleanArray = InferType<typeof unconstObj.obj.sampleBooleanArray>
type inferTypeTuple = InferType<typeof unconstObj.obj.sampleTuple>
type inferTypeFunction = InferType<typeof unconstObj.obj.sampleFunction>
type inferTypeObject = InferType<typeof unconstObj>

//
type GenerateObjectType<T> = { [key: string]: T | undefined }
