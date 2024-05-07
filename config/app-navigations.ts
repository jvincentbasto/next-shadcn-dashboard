import { appNavigationMode } from '@/lib/constants/navigations'
import { stylePosition } from '@/lib/constants/styles'

//
export const publicAppNavigations = {
  mode: appNavigationMode.type1,
  control: {
    components: {
      all: true,
      navbar: true,
      sidebar: true,
      logos: true
    },
    styles: {
      all: true,
      positions: true
    }
  },
  values: {
    components: {
      logos: [
        {
          type: appNavigationMode.type1,
          navbar: true,
          sidebar: true
        },
        {
          type: appNavigationMode.type2,
          navbar: true,
          sidebar: false
        }
      ]
    },
    styles: {
      positions: [
        {
          type: appNavigationMode.type1,
          navbar: stylePosition.fixed,
          sidebar: stylePosition.sticky
        },
        {
          type: appNavigationMode.type2,
          navbar: stylePosition.fixed,
          sidebar: stylePosition.sticky
        }
      ]
    }
  }
}

//
export const privateAppNavigations = {
  mode: appNavigationMode.type1,
  control: {
    components: {
      all: true,
      navbar: true,
      sidebar: true,
      logos: true
    },
    styles: {
      all: true,
      positions: true
    }
  },
  values: {
    components: {
      logos: [
        {
          type: appNavigationMode.type1,
          navbar: true,
          sidebar: true
        },
        {
          type: appNavigationMode.type2,
          navbar: false,
          sidebar: true
        }
      ]
    },
    styles: {
      positions: [
        {
          type: appNavigationMode.type1,
          navbar: stylePosition.fixed,
          sidebar: stylePosition.sticky
        },
        {
          type: appNavigationMode.type2,
          navbar: stylePosition.fixed,
          sidebar: stylePosition.sticky
        }
      ]
    }
  }
}

export const appNavigations = {
  public: publicAppNavigations,
  private: privateAppNavigations
}

//
export default appNavigations
