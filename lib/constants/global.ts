import navigationConstants from './navigations'
import styleConstants from './styles'

//
// ##############################
// * ########## Constants
// ##############################
//

//
export const globalConstants = {
  styleConstants,
  navigationConstants
}
export default globalConstants

//
// ##############################
// * ########## Types
// ##############################
//

export type TypeGlobal = {
  TypeStyles: typeof styleConstants
  TypeNavigations: typeof navigationConstants
}
