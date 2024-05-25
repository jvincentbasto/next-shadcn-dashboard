import { RowPinningPosition } from '@tanstack/react-table'

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
