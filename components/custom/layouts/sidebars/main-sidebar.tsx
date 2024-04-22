import Link from 'next/link'
import { Package2, Settings } from 'lucide-react'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  EnumValueNavigation,
  TypeNavigation
} from '@/lib/constants/navigations'
import utilityNavigations from '@/lib/utilities/navigations'

//
type WidgetProps = {
  readonly links?: TypeNavigation['AppNavigationWidgetLinkItem'][]
}

//
export default function MainSidebar({ links = [] }: WidgetProps) {
  //
  const logoItem = utilityNavigations.getters.getAppNavigationLogos(
    EnumValueNavigation.AppNavigation.public
  )
  const logo = logoItem.sidebar ? (
    <ul className='flex flex-col items-center gap-4 px-2 sm:pt-5'>
      <li>
        <Link
          href='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
      </li>
    </ul>
  ) : null

  //
  const mainList = (
    <ul className='flex flex-col items-center gap-4 px-2 sm:py-5'>
      {links.map(d => {
        return (
          <TooltipProvider key={d.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <li>
                  <Link
                    href={d.href}
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    {d.icon}
                    <span className='sr-only'>{d.label}</span>
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent side='right'>{d.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </ul>
  )

  //
  const bottomList = (
    <ul className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <li>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Settings className='h-5 w-5' />
                <span className='sr-only'>Settings</span>
              </Link>
            </li>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ul>
  )

  //
  return (
    <aside className='hidden min-h-screen w-14 flex-col border-r bg-background sm:flex'>
      {/* <aside className='fixed inset-y-0 left-0 z-10 hidden min-h-screen w-14 flex-col border-r bg-background sm:flex'> */}
      {logo}
      {mainList}
      {bottomList}
    </aside>
  )
}

export const MainSidebarPlaceholder = () => {
  return (
    <div className='hidden min-h-screen w-14 flex-col border-r bg-background sm:flex' />
  )
}
