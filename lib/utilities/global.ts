import utilityTypes from './types'
import stringUtilities from './string'
import utilityNavigations from './navigations'

//
// ##############################
// * ########## Export Default
// ##############################
//

export const utilityGlobal = {
  ...utilityTypes,
  ...stringUtilities,
  ...utilityNavigations
}
export default utilityGlobal
