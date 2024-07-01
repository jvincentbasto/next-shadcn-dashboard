import { RowPinningPosition } from '@tanstack/react-table'
import { headerZIndex } from './global'

//
// ##############################
// * ########## Get Row Positions
// ##############################
//
export const getRowPositions: (isPinned: RowPinningPosition) => {
  isTop: boolean
  isBottom: boolean
  isCenter: boolean
} = isPinned => {
  const isTop = isPinned === 'top'
  const isBottom = isPinned === 'bottom'
  const isCenter = isPinned === false

  return { isTop, isBottom, isCenter }
}

//
export const getTableHeaderPositionStyles = () => {
  return {
    position: 'sticky',
    top: '0',
    zIndex: `${headerZIndex}`
  }
}

//
export const getTableHeaderPositionClassNames = () => {
  const stickyHeader = `sticky top-0 z-[${headerZIndex}] shadow-lg`
  return stickyHeader
}
