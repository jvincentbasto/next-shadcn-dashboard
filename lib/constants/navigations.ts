//
// ##############################
// * ########## Constants
// ##############################
//

//
export const appNavigation = {
  public: 'public',
  private: 'private'
} as const

//
export const appNavigationMode = {
  type1: 'type1',
  type2: 'type2'
} as const

// * ########## Export Constants ##########
export const navigationConstants = {
  appNavigation,
  appNavigationMode
}
export default navigationConstants

//
// ##############################
// * ########## Types
// ##############################
//

// * #####
export type AppNavigationWidgetLinkItem = {
  icon?: JSX.Element
  label: string
  href: string
}
