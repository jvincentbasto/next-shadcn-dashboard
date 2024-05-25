import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

//
export const enableTableCardHeader = true

//
export const customTableCardHeader = (
  title: string = '',
  description: string = '',
  enable: boolean = enableTableCardHeader
) => {
  //
  const hasTitle = title.trim() !== ''
  const hasDescription = description.trim() !== ''

  //
  const customCardHeader =
    enable && (hasTitle || hasDescription) ? (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    ) : null

  return customCardHeader
}
