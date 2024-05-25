import { Column, ColumnPinningPosition } from '@tanstack/react-table'

//
// ##############################
// * ########## Get Column Positions
// ##############################
//
export const getColumnPositions = (isPinned: ColumnPinningPosition) => {
  const isLeft = isPinned === 'left'
  const isRight = isPinned === 'right'
  const isCenter = isPinned === false

  return { isLeft, isRight, isCenter }
}

//
// ##############################
// * ########## Get Pinned Column Positions
// ##############################
//
export const getLeftColumnPositions = <TData,>(
  column: Column<TData, unknown>
) => {
  const isPinned = column.getIsPinned()
  const { isLeft } = getColumnPositions(isPinned)

  //
  const isLeftFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isLeft
  const isLeftLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isLeft
  const isLeftCenterColumn = !isLeftFirstColumn && !isLeftLastColumn && isLeft

  return {
    isLeftFirstColumn,
    isLeftLastColumn,
    isLeftCenterColumn
  }
}

//
export const getRightColumnPositions = <TData,>(
  column: Column<TData, unknown>
) => {
  const isPinned = column.getIsPinned()
  const { isRight } = getColumnPositions(isPinned)

  //
  const isRightFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isRight
  const isRightLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isRight
  const isRightCenterColumn =
    !isRightFirstColumn && !isRightLastColumn && isRight

  return {
    isRightFirstColumn,
    isRightLastColumn,
    isRightCenterColumn
  }
}

//
export const getCenterColumnPositions = <TData,>(
  column: Column<TData, unknown>
) => {
  const isPinned = column.getIsPinned()
  const { isCenter } = getColumnPositions(isPinned)

  //
  const isCenterFirstColumn =
    column.getIsFirstColumn(isPinned || 'center') && isCenter
  const isCenterLastColumn =
    column.getIsLastColumn(isPinned || 'center') && isCenter
  const isCenterCenterColumn =
    !isCenterFirstColumn && !isCenterLastColumn && isCenter

  return {
    isCenterFirstColumn,
    isCenterLastColumn,
    isCenterCenterColumn
  }
}
