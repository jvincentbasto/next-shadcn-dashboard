//
// ##############################
// * ########## Getters
// ##############################
//

//
export const nullCheck = (value: any): boolean => {
  const hasValue = value === null || value === undefined
  return hasValue
}

//
export const arrayCheck = (
  value: any,
  { length = false }: { length?: boolean } = {}
): boolean => {
  let hasValue = !nullCheck(value)
  hasValue = hasValue && Array.isArray(value)

  //
  if (length) {
    hasValue = hasValue && value.length > 0
  }

  //
  return hasValue
}

// * ########## Export Getters ##########
export const utilityTypesGetters = {
  nullCheck,
  arrayCheck
}

//
// ##############################
// * ########## Setters
// ##############################
//

// * ########## Export Setters ##########
export const utilityTypesSetters = {}

//
// ##############################
// * ########## Export
// ##############################
//

// * ########## Export Default ##########
export const utilityTypes = {
  getters: utilityTypesSetters,
  setters: utilityTypesGetters
}
export default utilityTypes
