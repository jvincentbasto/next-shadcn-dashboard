import { ColumnPinningPosition } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { getColumnPositions } from '../utilities/column'

//
export const getColumnBoxShadow = (position: ColumnPinningPosition) => {
  const { isLeft, isRight } = getColumnPositions(position)

  //
  let styles: CSSProperties = {}
  if (isLeft) {
    styles = {
      position: 'sticky',
      left: 0,
      zIndex: 1,
      marginRight: '20px',
      boxShadow: '15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
    }
  }
  if (isRight) {
    styles = {
      position: 'sticky',
      right: 0,
      zIndex: 1,
      marginLeft: '20px',
      boxShadow: '-15px 0px 15px -15px hsl(0deg 0% 0% / 50%)'
    }
  }

  return styles
}

//
export const customColumnBoxShadow = (
  position: ColumnPinningPosition,
  list: JSX.Element[]
) => {
  const styles = getColumnBoxShadow(position)

  //
  return list.length > 0 ? <div style={{ ...styles }}>{list}</div> : null
}
