import {
  RootPrivateLayoutType,
  RootPublicLayoutType
} from '@/lib/constants/global'

//
export const publicLayouts = {
  layout: RootPublicLayoutType.type2,
  control: {
    navbar: true,
    sidebar: true
  },
  logos: [
    {
      type: RootPublicLayoutType.type1,
      navbar: true,
      sidebar: true
    },
    {
      type: RootPublicLayoutType.type2,
      navbar: true,
      sidebar: false
    }
  ]
}

export const privateLayouts = {
  layout: RootPrivateLayoutType.type1,
  control: {
    navbar: true,
    sidebar: true
  },
  logos: [
    {
      type: RootPrivateLayoutType.type1,
      navbar: true,
      sidebar: true
    },
    {
      type: RootPrivateLayoutType.type2,
      navbar: false,
      sidebar: true
    }
  ]
}

export const appLayouts = {
  publicLayouts,
  privateLayouts
}

//
export const appConfig = {
  appLayouts
}
