import { Header } from '@tanstack/react-table'
import {
  ColumnSeparatorType,
  centerColumnSeparator,
  getColumnSeparatorType,
  getColumnSeparatorWidth,
  leftColumnSeparator,
  rightColumnSeparator
} from '../../utilities/separator'
import { getColumnPositions } from '../../utilities/column'
import { FoldHorizontal } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

//
// ##############################
// * ########## Column Separator
// ##############################
//
export const customColumnSeparator: <TData>(
  header: Header<TData, unknown>,
  separator?: ColumnSeparatorType,
  test?: boolean
) => JSX.Element = (header, separator = false, test = false) => {
  const { column } = header
  const isPinned = column.getIsPinned()
  const { isLeft, isRight, isCenter } = getColumnPositions(isPinned)

  //
  const { isDisable, isIcon } = getColumnSeparatorType(separator)
  const width = getColumnSeparatorWidth(separator)

  //
  const layout = 'h-full flex justify-center items-center'
  const resizingStyles =
    isIcon && header.column.getIsResizing() ? 'text-blue-500' : ''

  //
  let position = 'absolute top-0 touch-none user-none'
  position = isIcon ? `${position} cursor-col-resize` : position

  //
  let resizeIcon
  if (isLeft || isCenter) {
    position = `${position} right-0`
    resizeIcon = 'translate-x-[10px]'
  } else if (isRight) {
    position = `${position} left-0`
    resizeIcon = '-translate-x-[10px]'
  }

  //
  const events = isIcon
    ? {
        onDoubleClick: () => header.column.resetSize(),
        onClick: header.getResizeHandler(),
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler()
      }
    : {}

  //
  const resizerClassNames = isIcon
    ? `${layout} ${position} ${resizeIcon} ${resizingStyles}`
    : `${layout} ${position} ${resizeIcon}`

  //
  const customResizer = isDisable ? null : (
    <div style={{ width }} className={`${resizerClassNames}`} {...events}>
      {isIcon ? (
        <FoldHorizontal />
      ) : (
        <Separator orientation='vertical' className='h-[50%]' />
      )}
    </div>
  )

  //
  return (
    <div className={`${layout}`}>
      <div
        className={`${layout}`}
        style={{ paddingRight: isDisable ? '10px' : undefined, width }}
      >
        {customResizer}
      </div>
    </div>
  )
}

//
export const customColumnSeparatorBlock: <TData>(
  header: Header<TData, unknown>,
  slot?: JSX.Element | null
) => JSX.Element = (header, slot) => {
  const { column } = header
  const isPinned = column.getIsPinned()
  const { isLeft, isRight, isCenter } = getColumnPositions(isPinned)

  return (
    <>
      {isRight ? customColumnSeparator(header, rightColumnSeparator) : null}
      {slot ?? null}
      {isLeft ? customColumnSeparator(header, leftColumnSeparator) : null}
      {isCenter ? customColumnSeparator(header, centerColumnSeparator) : null}
    </>
  )
}
