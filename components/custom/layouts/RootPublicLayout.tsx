import { ReactNode } from 'react'
import MainSidebar from './sidebars/MainSidebar'
import MainNavbar from './navbars/MainNavbar'
import { Home, LineChart, Package, ShoppingCart, Users2 } from 'lucide-react'
import { appConfig } from '@/config/config'
import {
  AppNavigationWidgetLinkItem,
  appNavigation,
  appNavigationMode
} from '@/lib/constants/navigations'
import utilityNavigations from '@/lib/utilities/navigations'

//
type WidgetProps = {
  readonly children: ReactNode
  readonly links?: AppNavigationWidgetLinkItem[]
  readonly mode?: ObjectValues<typeof appNavigationMode>
}

//
const iconClassNames = 'h-5 w-5'
const defaultLinks = [
  {
    icon: <Home className={`${iconClassNames}`} />,
    label: 'Dashboard',
    href: '#'
  },
  {
    icon: <ShoppingCart className={`${iconClassNames}`} />,
    label: 'Orders',
    href: '#'
  },
  {
    icon: <Package className={`${iconClassNames}`} />,
    label: 'Products',
    href: '#'
  },
  {
    icon: <Users2 className={`${iconClassNames}`} />,
    label: 'Customers',
    href: '#'
  },
  {
    icon: <LineChart className={`${iconClassNames}`} />,
    label: 'Analytics',
    href: '#'
  }
]

//
export default function RootPublicLayout({
  children,
  links = defaultLinks,
  mode = appConfig.navigations.public.mode
}: WidgetProps) {
  //
  if (mode === appNavigationMode.type2) {
    return (
      <RootPublicLayoutType2 links={links}>{children}</RootPublicLayoutType2>
    )
  }

  //
  return <RootPublicLayoutType1 links={links}>{children}</RootPublicLayoutType1>
}

//
const RootPublicLayoutType1 = ({ children, links }: WidgetProps) => {
  const control = utilityNavigations.getters.getAppNavigationControlComponents(
    appNavigation.public
  )

  //
  return (
    <div className='flex min-h-screen w-screen min-w-[325px] overflow-hidden bg-muted/40'>
      {control.sidebar ? <MainSidebar links={links} /> : null}
      <div className='flex min-h-screen w-full flex-col'>
        {control.navbar ? <MainNavbar links={links} /> : null}
        <main className='min-h-screen w-full'>{children}</main>
      </div>
    </div>
  )
}

//
const RootPublicLayoutType2 = ({ children, links }: WidgetProps) => {
  const control = utilityNavigations.getters.getAppNavigationControlComponents(
    appNavigation.public
  )

  //
  return (
    <div className='min-h-screen w-screen min-w-[325px] overflow-hidden bg-muted/40'>
      {control.navbar ? <MainNavbar links={links} /> : null}
      <div className='flex min-h-screen w-full'>
        {control.sidebar ? <MainSidebar links={links} /> : null}
        <main className='min-h-screen w-full'>{children}</main>
      </div>
    </div>
  )
}
