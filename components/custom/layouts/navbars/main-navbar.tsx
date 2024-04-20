import { appConfig } from '@/app/config/app-config'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import {
  AppLayoutType,
  RootPublicLayoutType,
  RootPublicNavLinkType
} from '@/lib/constants/global'
import {
  getAppConfigLayoutLogos,
  setValueByLayoutType
} from '@/lib/utilities/global'
import { Package2 } from 'lucide-react'
import Link from 'next/link'

//
type WidgetProps = {
  readonly links?: RootPublicNavLinkType[]
}

//
export default function MainNavbar({ links = [] }: WidgetProps) {
  //
  const logoUlLayout = setValueByLayoutType({
    value: {
      layout: RootPublicLayoutType.type2,
      value: 'px-[3px]'
    },
    defaultValue: ''
  })

  //
  const navLayout = setValueByLayoutType({
    value: {
      layout: RootPublicLayoutType.type2,
      value: 'px-6 pl-2'
    },
    defaultValue: 'px-6'
  })

  //
  const showLogo = getAppConfigLayoutLogos(AppLayoutType.public)
  const logo = showLogo.navbar ? (
    <ul className={`flex flex-col items-center gap-4 sm:pt-5 ${logoUlLayout}`}>
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
    <ul className='mx-6 flex w-full items-center justify-end pr-4'>
      {links.map(d => {
        return (
          <li key={d.label} className='px-2'>
            <Link
              href={d.href}
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              <span>{d.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  //
  const bottomList = (
    <ul className='ml-auto flex items-center space-x-4'>
      <li>
        <ThemeToggle />
      </li>
      <li>
        <UserNav />
      </li>
    </ul>
  )

  //
  return (
    <nav className={`flex h-16 w-full space-x-4 border-b ${navLayout}`}>
      {logo}
      {mainList}
      {bottomList}
    </nav>
  )
}
