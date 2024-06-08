import { ColumnPinningPosition } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { getColumnPositions } from '../utilities/column'

//
export const getColumnBoxShadowStyles = (
  position: ColumnPinningPosition,
  isHeader: boolean = false
) => {
  const { isLeft, isRight } = getColumnPositions(position)

  //
  let styles: CSSProperties = {}
  if (isLeft) {
    styles = {
      position: 'sticky',
      left: 0,
      zIndex: 1,
      marginRight: '20px',
      boxShadow: isHeader
        ? '15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
        : undefined
    }
  }
  if (isRight) {
    styles = {
      position: 'sticky',
      right: 0,
      zIndex: 1,
      marginLeft: '20px',
      boxShadow: isHeader
        ? '-15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
        : undefined
    }
  }

  return styles
}

//
export const getColumnBoxShadowClassNames = (
  position: ColumnPinningPosition,
  isHeader: boolean = false
) => {
  const { isLeft, isRight } = getColumnPositions(position)

  //
  let classNames = ''
  if (isLeft) {
    classNames = isHeader ? '' : 'shadow-2xl'
  }
  if (isRight) {
    classNames = isHeader ? '' : 'shadow-2xl'
  }

  return classNames
}

//
export const getTableHeaderBoxShadowStyles = () => {
  return {
    boxShadow: '0px 10px 10px -10px hsl(0deg 0% 0% / 50%)'
  }
}

//
export const getTableHeaderBoxShadowClassNames = () => {
  return 'shadow-lg'
}

//
export const customColumnBoxShadow = (
  position: ColumnPinningPosition,
  list: JSX.Element[],
  isHeader: boolean = false
) => {
  const styles = getColumnBoxShadowStyles(position, isHeader)
  const className = getColumnBoxShadowClassNames(position, isHeader)

  //
  return list.length > 0 ? (
    <div className={`h-full ${className}`} style={{ ...styles }}>
      {list}
    </div>
  ) : null
}
