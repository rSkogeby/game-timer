import type { LinkingOptions, ParamListBase } from '@react-navigation/native'
import * as upstream from '@react-navigation/native'

type NavigationRoute = { [Key in keyof ParamList]: { name: Key, params: ParamList[Key] } }[keyof ParamList]

export interface InitialNavigationState {
  index: number
  routes: NavigationRoute[]
}

export interface ParamList extends ParamListBase {
  Landing: {}
}

export type Link<RouteName extends keyof ParamList = keyof ParamList> = [RouteName, ParamList[RouteName]]

export const linkingOptions: LinkingOptions<ParamList> = {
  prefixes: [],
  config: {
    screens: {
      Landing: ''
    }
  },
  getPathFromState: upstream.getPathFromState,
  getStateFromPath: upstream.getStateFromPath
}
