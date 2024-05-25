import { Card } from '@/components/ui/card'
import { customTableCardHeader, enableTableCardHeader } from './header'
import { customTableCardContent, enableTableCardContent } from './content'
import { customTableCardFooter, enableTableCardFooter } from './footer'
import { Table } from '@tanstack/react-table'

//
export const defaultCardOptions = {
  header: enableTableCardHeader,
  content: enableTableCardContent,
  footer: enableTableCardFooter
}

//
export const defaultCardHeaderProps = {
  title: '',
  description: ''
}

//
export const defaultCardFooterProps = {
  page: 1,
  total: 10,
  title: 'Total'
}

//
export const customTableCard = <T,>(
  slot: JSX.Element,
  table: Table<T>,
  headerOptions: GenerateObjectType<string> = defaultCardHeaderProps,
  footerOptions: GenerateObjectType<number | string> = defaultCardFooterProps,
  options: GenerateObjectType<boolean> = defaultCardOptions
) => {
  const { title, description } = { ...defaultCardHeaderProps, ...headerOptions }
  const {
    page,
    total,
    title: titleFooter
  } = { ...defaultCardFooterProps, ...footerOptions }

  //
  const { header, content, footer } = { ...defaultCardOptions, ...options }

  //
  return (
    <Card className='h-full w-full'>
      {header ? customTableCardHeader(title, description) : null}
      {content ? customTableCardContent(slot, table) : null}
      {footer ? customTableCardFooter(page, total, titleFooter) : null}
    </Card>
  )
}
