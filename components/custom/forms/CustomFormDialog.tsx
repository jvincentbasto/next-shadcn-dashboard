import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

//
type TCustomForm = {
  [key: string]: any
  btnTitle?: string
  title?: string
  description?: string
  footerTitle?: string
  //
  children?: React.ReactNode
  dialogTrigger?: React.ReactNode
  dialogHeader?: React.ReactNode
  dialogFooter?: React.ReactNode
  //
  enableTrigger?: boolean
  triggerOnClick?: () => void
  //
  dialogModal?: boolean
  dialogOpen?: boolean
  dialogOnOpenChange?: (open: boolean) => void
  //
}

//
export const CustomFormDialog = ({
  btnTitle = 'Open',
  title,
  description,
  footerTitle,
  //
  children,
  dialogTrigger,
  dialogHeader,
  dialogFooter,
  //
  enableTrigger = false,
  triggerOnClick,
  //
  dialogModal = true,
  dialogOpen = false,
  dialogOnOpenChange
}: TCustomForm) => {
  //
  const defaultDialogTrigger = enableTrigger ? (
    <DialogTrigger
      onClick={e => {
        if (triggerOnClick) {
          triggerOnClick()
        }
      }}
    >
      {btnTitle}
    </DialogTrigger>
  ) : null

  //
  const defaultDialogHeader = title ? (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {description ? (
        <DialogDescription>{description}</DialogDescription>
      ) : null}
    </DialogHeader>
  ) : null

  //
  const defaultDialogFooter = footerTitle ? (
    <DialogFooter>{footerTitle}</DialogFooter>
  ) : null

  //
  const defaultDialogContent = (
    <DialogContent>
      {dialogHeader ?? defaultDialogHeader}
      {children}
      {dialogFooter ?? defaultDialogFooter}
    </DialogContent>
  )

  //
  return (
    <Dialog
      modal={dialogModal}
      open={dialogOpen}
      onOpenChange={(open: boolean) => {
        if (dialogOnOpenChange) {
          dialogOnOpenChange(open)
        }
      }}
    >
      {dialogTrigger ?? defaultDialogTrigger}
      {defaultDialogContent}
    </Dialog>
  )
}

export default CustomFormDialog
