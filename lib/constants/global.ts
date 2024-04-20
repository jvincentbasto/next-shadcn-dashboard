// * ########## App Types ##########
export enum AppLayoutType {
  public = 'public',
  private = 'private'
}

//
export type AppLayoutLogoType = {
  type: RootPublicLayoutType | RootPrivateLayoutType
  navbar: boolean
  sidebar: boolean
}

// * ########## Root Public Types ##########
export enum RootPublicLayoutType {
  type1 = 1,
  type2
}

//
export type RootPublicNavLinkType = {
  icon?: JSX.Element
  label: string
  href: string
}

// * ########## Root Private Types ##########
export enum RootPrivateLayoutType {
  type1 = 1,
  type2
}

//
export type RootPrivateNavLinkType = {
  icon?: JSX.Element
  label: string
  href: string
}
