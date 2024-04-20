import { ReactNode } from 'react'
import MainSidebar from './sidebars/main-sidebar'
import MainNavbar from './navbars/main-navbar'
import {
  AppLayoutType,
  RootPublicLayoutType,
  RootPublicNavLinkType
} from '@/lib/constants/global'
import { Home, LineChart, Package, ShoppingCart, Users2 } from 'lucide-react'
import { appConfig } from '@/app/config/app-config'
import { getAppConfigLayoutControl } from '@/lib/utilities/global'

//
type WidgetProps = {
  readonly children: ReactNode
  readonly links?: RootPublicNavLinkType[]
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
  links = defaultLinks
}: WidgetProps) {
  const layout = appConfig.appLayouts.publicLayouts.layout

  //
  if (layout === RootPublicLayoutType.type2) {
    return (
      <RootPublicLayoutType2 links={links}>{children}</RootPublicLayoutType2>
    )
  }

  //
  return <RootPublicLayoutType1 links={links}>{children}</RootPublicLayoutType1>
}

//
const RootPublicLayoutType1 = ({ children, links }: WidgetProps) => {
  const control = getAppConfigLayoutControl(AppLayoutType.public)

  //
  return (
    <div className='flex min-h-screen w-full bg-muted/40'>
      {control.sidebar ? <MainSidebar links={links} /> : null}
      <div className='flex h-full w-full flex-col'>
        {control.navbar ? <MainNavbar links={links} /> : null}
        <main>{children}</main>
      </div>
    </div>
  )
}

//
const RootPublicLayoutType2 = ({ children, links }: WidgetProps) => {
  const control = getAppConfigLayoutControl(AppLayoutType.public)

  //
  return (
    <div className='min-h-screen w-full bg-muted/40'>
      {control.navbar ? <MainNavbar links={links} /> : null}
      <div className='flex h-full w-full'>
        {control.sidebar ? <MainSidebar links={links} /> : null}
        <main className='w-full'>{children}</main>
      </div>
    </div>
  )
}
