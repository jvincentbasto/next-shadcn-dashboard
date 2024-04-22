import { EnumStyles } from './styles'

//
// ##############################
// * ########## Constants
// ##############################
//

// * ########## Export Constants ##########
export const navigationConstants = {}
export default navigationConstants

//
// ##############################
// * ########## Enums
// ##############################
//

// * #####
export enum AppNavigation {
  public = 'public',
  private = 'private'
}

//
export enum AppNavigationMode {
  type1 = 1,
  type2
}

// * ########## Export Enums ##########
export type EnumNavigation = {
  AppNavigation: AppNavigation
  AppNavigationMode: AppNavigationMode
}
export const EnumValueNavigation = {
  AppNavigation: AppNavigation,
  AppNavigationMode: AppNavigationMode
}

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

// * #####
export type AppNavigationLinks = {
  type: AppNavigationMode
  navbar: boolean
  sidebar: boolean
}

// * #####
export type AppNavigationControl = {
  components: AppNavigationControlComponents
  styles: AppNavigationControlStyles
}

//
export type AppNavigationControlComponents = {
  all: boolean
  navbar: boolean
  sidebar: boolean
  logos: boolean
}

//
export type AppNavigationControlStyles = {
  all: boolean
  positions: boolean
}

//
export type AppNavigationComponentLogo = {
  type: AppNavigationMode
  navbar: boolean
  sidebar: boolean
}

//
export type AppNavigationStylePosition = {
  type: AppNavigationMode
  navbar: EnumStyles['StylePosition']
  sidebar: EnumStyles['StylePosition']
}

// * ########## Export Enums ##########
export type TypeNavigation = {
  AppNavigationWidgetLinkItem: AppNavigationWidgetLinkItem
  AppNavigationLinks: AppNavigationLinks
  AppNavigationControl: AppNavigationControl
  AppNavigationControlComponents: AppNavigationControlComponents
  AppNavigationControlStyles: AppNavigationControlStyles
  AppNavigationComponentLogo: AppNavigationComponentLogo
  AppNavigationStylePosition: AppNavigationStylePosition
}
