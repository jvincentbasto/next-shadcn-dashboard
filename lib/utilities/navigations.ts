import { appConfig } from '@/app/config/app-config'
import {
  EnumNavigation,
  EnumValueNavigation,
  TypeNavigation
} from './../constants/navigations'
import utilityTypes from './types'

//
// ##############################
// * ########## Getters
// ##############################
//

// * #####
type getAppNavigationPropValueProps = {
  mode?: EnumNavigation['AppNavigation']
}
type getAppNavigationPropValueFunction = (
  args?: getAppNavigationPropValueProps
) => typeof appConfig.navigations.public | typeof appConfig.navigations.private

//
export const getAppNavigationPropValue: getAppNavigationPropValueFunction = ({
  mode = EnumValueNavigation.AppNavigation.public
} = {}) => {
  let value = appConfig.navigations.public

  //
  if (mode === EnumValueNavigation.AppNavigation.private) {
    value = appConfig.navigations.private
  }

  //
  return value
}

// * #####
type getAppNavigationLogosProps = EnumNavigation['AppNavigation']
type getAppNavigationLogosFunction = (
  args: getAppNavigationLogosProps
) => TypeNavigation['AppNavigationComponentLogo']

//
export const getAppNavigationLogos: getAppNavigationLogosFunction = (
  mode = EnumValueNavigation.AppNavigation.public
) => {
  let value = {
    type: appConfig.navigations.public.mode,
    navbar: true,
    sidebar: true
  }

  //
  const publicMode = getAppNavigationPropValue()
  if (mode === EnumValueNavigation.AppNavigation.public) {
    const match = publicMode.values.components.logos.filter(
      d => d.type === publicMode.mode
    )
    if (match) {
      value = match[0]
    }
  }

  //
  const privateMode = getAppNavigationPropValue({ mode })
  const privateLayout = appConfig.navigations.private
  if (mode === EnumValueNavigation.AppNavigation.private) {
    const match = privateMode.values.components.logos.filter(
      d => d.type === privateLayout.mode
    )
    if (match) {
      value = match[0]
    }
  }

  return value
}

// * #####
type getAppNavigationControlProps = {
  mode?: EnumNavigation['AppNavigation']
}
type getAppNavigationControlFunction = (
  args?: getAppNavigationControlProps
) => TypeNavigation['AppNavigationControl']

//
export const getAppNavigationControl: getAppNavigationControlFunction = ({
  mode = EnumValueNavigation.AppNavigation.public
} = {}) => {
  let value = appConfig.navigations.public.control

  //
  const privateMode = getAppNavigationPropValue({ mode })
  if (mode === EnumValueNavigation.AppNavigation.private) {
    value = privateMode.control
  }

  return value
}

// * #####
type getAppNavigationControlComponentsProps = {
  mode?: EnumNavigation['AppNavigation']
}
type getAppNavigationControlComponentsFunction = (
  args?: getAppNavigationControlComponentsProps
) => TypeNavigation['AppNavigationControlComponents']

//
export const getAppNavigationControlComponents: getAppNavigationControlComponentsFunction =
  ({ mode = EnumValueNavigation.AppNavigation.public } = {}) => {
    let value = getAppNavigationControl({ mode }).components
    return value
  }

// * #####
type getAppNavigationControlStylesProps = {
  mode?: EnumNavigation['AppNavigation']
}
type getAppNavigationControlStylesFunction = (
  args?: getAppNavigationControlStylesProps
) => TypeNavigation['AppNavigationControlStyles']

//
export const getAppNavigationControlStyles: getAppNavigationControlStylesFunction =
  ({ mode = EnumValueNavigation.AppNavigation.public } = {}) => {
    let value = getAppNavigationControl({ mode }).styles
    return value
  }

// * ########## Export Setters ##########
export const utilityNavigationGetters = {
  getAppNavigationPropValue,
  getAppNavigationLogos,
  getAppNavigationControl,
  getAppNavigationControlComponents,
  getAppNavigationControlStyles
}

//
// ##############################
// * ########## Setters
// ##############################
//

// * #####
type setByAppNavigationModeValue<T> = {
  mode: EnumNavigation['AppNavigationMode']
  value: T
}
type setByAppNavigationModeProps<T> = {
  mode?: EnumNavigation['AppNavigationMode']
  value: setByAppNavigationModeValue<T>
  values?: setByAppNavigationModeValue<T>[]
  defaultValue: T
}
type setByAppNavigationModeFunction = <T>(
  args: setByAppNavigationModeProps<T>
) => T

//
export const setByAppNavigationMode: setByAppNavigationModeFunction = ({
  mode = appConfig.navigations.public.mode,
  value,
  values = [],
  defaultValue
}) => {
  let newValue = defaultValue

  if (!utilityTypes.setters.nullCheck(mode)) {
    const type2 = [EnumValueNavigation.AppNavigationMode.type2]
    if (type2.includes(mode)) {
      newValue = value.value
    }

    //
    if (utilityTypes.setters.arrayCheck(values)) {
      for (const item of values) {
        if (item.mode === mode) {
          newValue = value.value
        }
      }
    }
  }

  return newValue
}

// * ########## Export Setters ##########
export const utilityNavigationSetters = {
  setByAppNavigationMode
}

//
// ##############################
// * ########## Export Default
// ##############################
//

export const utilityNavigations = {
  getters: utilityNavigationGetters,
  setters: utilityNavigationSetters
}
export default utilityNavigations
