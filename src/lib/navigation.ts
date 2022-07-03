import { getPathFromState as upstreamGetPathFromState, getStateFromPath as upstreamGetStateFromPath } from '@react-navigation/core'
import type { LinkingOptions } from '@react-navigation/native'
import * as upstream from '@react-navigation/native'

type NavigationRoute = { [Key in keyof ParamList]: { name: Key, params: ParamList[Key] } }[keyof ParamList]

export interface InitialNavigationState {
  index: number
  routes: NavigationRoute[]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ParamList = {
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
