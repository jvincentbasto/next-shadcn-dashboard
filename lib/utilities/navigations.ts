import { appNavigation, appNavigationMode } from './../constants/navigations'
import { appConfig } from '@/config/app-config'
import utilityTypes from './types'

//
// ##############################
// * ########## Getters
// ##############################
//

// * #####
type getAppNavigationPropValueType = (
  args?: ObjectValues<typeof appNavigation>
) => typeof appConfig.navigations.public | typeof appConfig.navigations.private

//
export const getAppNavigationPropValue: getAppNavigationPropValueType = (
  mode = appNavigation.public
) => {
  let value:
    | typeof appConfig.navigations.public
    | typeof appConfig.navigations.private = appConfig.navigations.public

  //
  if (mode === appNavigation.private) {
    value = appConfig.navigations.private
  }

  //
  return value
}

// * #####
type getAppNavigationLogosType = (
  args: ObjectValues<typeof appNavigation>
) =>
  | (typeof appConfig.navigations.public.values.components.logos)[0]
  | (typeof appConfig.navigations.private.values.components.logos)[0]

//
export const getAppNavigationLogos: getAppNavigationLogosType = (
  mode = appNavigation.public
) => {
  let value = appConfig.navigations.public.values.components.logos[0]

  //
  const publicMode = getAppNavigationPropValue()
  if (mode === appNavigation.public) {
    const match = publicMode.values.components.logos.filter(
      d => d.type === publicMode.mode
    )
    if (match) {
      value = match[0]
    }
  }

  //
  const privateMode = getAppNavigationPropValue(mode)
  const privateLayout = appConfig.navigations.private
  if (mode === appNavigation.private) {
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
type getAppNavigationControlType = (
  args?: ObjectValues<typeof appNavigation>
) =>
  | typeof appConfig.navigations.public.control
  | typeof appConfig.navigations.private.control

//
export const getAppNavigationControl: getAppNavigationControlType = (
  mode = appNavigation.public
) => {
  let value = appConfig.navigations.public.control

  //
  const privateMode = getAppNavigationPropValue(mode)
  if (mode === appNavigation.private) {
    value = privateMode.control
  }

  return value
}

// * #####
type getAppNavigationControlComponentsFunction = (
  args?: ObjectValues<typeof appNavigation>
) =>
  | typeof appConfig.navigations.public.control.components
  | typeof appConfig.navigations.private.control.components

//
export const getAppNavigationControlComponents: getAppNavigationControlComponentsFunction =
  (mode = appNavigation.public) => {
    let value = getAppNavigationControl(mode).components
    return value
  }

// * #####
type getAppNavigationControlStylesFunction = (
  args?: ObjectValues<typeof appNavigation>
) =>
  | typeof appConfig.navigations.public.control.styles
  | typeof appConfig.navigations.private.control.styles

//
export const getAppNavigationControlStyles: getAppNavigationControlStylesFunction =
  (mode = appNavigation.public) => {
    let value = getAppNavigationControl(mode).styles
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
  mode: ObjectValues<typeof appNavigationMode>
  value: T
}
type setByAppNavigationModeProps<T> = {
  mode?: ObjectValues<typeof appNavigationMode>
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
    if (appNavigationMode.type2 === mode) {
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
