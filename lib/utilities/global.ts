import { appConfig } from '@/app/config/app-config'
import {
  AppLayoutLogoType,
  AppLayoutType,
  RootPrivateLayoutType,
  RootPublicLayoutType
} from '../constants/global'

// * ########## Type Validation ##########
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

// * ########## Type Validation ##########
type publicLayoutGenericType = string | boolean
type classNameValueType = {
  layout: RootPublicLayoutType | RootPrivateLayoutType
  value: publicLayoutGenericType
}

// * ########## Setter: Layout Type ##########
export const setValueByLayoutType = <T extends publicLayoutGenericType>({
  layout = appConfig.appLayouts.publicLayouts.layout,
  value,
  values = [],
  defaultValue
}: {
  layout?: RootPublicLayoutType | RootPrivateLayoutType
  value: classNameValueType
  values?: classNameValueType[]
  defaultValue: publicLayoutGenericType
}): T => {
  let newValue = defaultValue

  if (!nullCheck(layout)) {
    const type2 = [RootPublicLayoutType.type2, RootPrivateLayoutType.type2]
    if (type2.includes(layout)) {
      newValue = value.value
    }

    //
    if (arrayCheck(values)) {
      for (const item of values) {
        if (item.layout === layout) {
          newValue = value.value
        }
      }
    }
  }

  return newValue as T
}

// * ########## Getter: App Configs ##########
export const getAppConfigLayoutLogos = (
  layout: AppLayoutType
): AppLayoutLogoType => {
  let value: {
    type: RootPublicLayoutType | RootPrivateLayoutType
    navbar: boolean
    sidebar: boolean
  } = {
    type: RootPublicLayoutType.type1,
    navbar: true,
    sidebar: true
  }

  //
  const publicLayout = appConfig.appLayouts.publicLayouts
  if (layout === AppLayoutType.public) {
    const match = publicLayout.logos.filter(d => d.type === publicLayout.layout)
    if (match) {
      value = match[0]
    }
  }

  //
  const privateLayout = appConfig.appLayouts.privateLayouts
  if (layout === AppLayoutType.private) {
    const match = privateLayout.logos.filter(
      d => d.type === privateLayout.layout
    )
    if (match) {
      value = match[0]
    }
  }

  return value
}

//
export const getAppConfigLayoutControl = (layout: AppLayoutType) => {
  let value: {
    navbar: boolean
    sidebar: boolean
  } = {
    navbar: true,
    sidebar: true
  }

  //
  const publicLayout = appConfig.appLayouts.publicLayouts
  if (layout === AppLayoutType.public) {
    value = publicLayout.control
  }

  //
  const privateLayout = appConfig.appLayouts.privateLayouts
  if (layout === AppLayoutType.private) {
    value = privateLayout.control
  }

  return value
}
