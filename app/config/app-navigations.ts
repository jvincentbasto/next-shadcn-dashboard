import { EnumValueNavigation } from '@/lib/constants/navigations'
import { EnumValueStyles } from '@/lib/constants/styles'

//
export const publicAppNavigations = {
  mode: EnumValueNavigation.AppNavigationMode.type1,
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
          type: EnumValueNavigation.AppNavigationMode.type1,
          navbar: true,
          sidebar: true
        },
        {
          type: EnumValueNavigation.AppNavigationMode.type2,
          navbar: true,
          sidebar: false
        }
      ]
    },
    styles: {
      positions: [
        {
          type: EnumValueNavigation.AppNavigationMode.type1,
          navbar: EnumValueStyles.StylePosition.fixed,
          sidebar: EnumValueStyles.StylePosition.sticky
        },
        {
          type: EnumValueNavigation.AppNavigationMode.type2,
          navbar: EnumValueStyles.StylePosition.fixed,
          sidebar: EnumValueStyles.StylePosition.sticky
        }
      ]
    }
  }
}

//
export const privateAppNavigations = {
  mode: EnumValueNavigation.AppNavigationMode.type1,
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
          type: EnumValueNavigation.AppNavigationMode.type1,
          navbar: true,
          sidebar: true
        },
        {
          type: EnumValueNavigation.AppNavigationMode.type2,
          navbar: false,
          sidebar: true
        }
      ]
    },
    styles: {
      positions: [
        {
          type: EnumValueNavigation.AppNavigationMode.type1,
          navbar: EnumValueStyles.StylePosition.fixed,
          sidebar: EnumValueStyles.StylePosition.sticky
        },
        {
          type: EnumValueNavigation.AppNavigationMode.type2,
          navbar: EnumValueStyles.StylePosition.fixed,
          sidebar: EnumValueStyles.StylePosition.sticky
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
