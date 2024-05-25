//
// ##############################
// * ########## Types
// ##############################
//
export type ColumnSeparatorType = 'placeholder' | 'icon' | false | undefined

//
// ##############################
// * ########## Constants
// ##############################
//
export const leftColumnSeparator: ColumnSeparatorType = 'icon'
export const rightColumnSeparator: ColumnSeparatorType = 'icon'
export const centerColumnSeparator: ColumnSeparatorType = 'placeholder'

//
// ##############################
// * ########## Getters
// ##############################
//
export const getColumnSeparatorType = (separator: ColumnSeparatorType) => {
  //
  const isDisable = separator === false || separator === undefined
  const isIcon = !isDisable && separator === 'icon'
  const isPlaceholder = !isDisable && separator === 'placeholder'

  //
  return {
    isDisable,
    isIcon,
    isPlaceholder
  }
}

//
export const getColumnSeparatorWidth = (
  separator?: ColumnSeparatorType,
  values: { [key: string]: string } = {
    icon: '20px',
    placeholder: '10px',
    defaultValue: '20px'
  }
) => {
  // ####################
  const { isIcon, isPlaceholder } = getColumnSeparatorType(separator)
  const { icon, placeholder, defaultValue } = values

  // ####################
  if (isIcon) {
    return icon
  }
  if (isPlaceholder) {
    return placeholder
  }

  //
  return defaultValue
}
