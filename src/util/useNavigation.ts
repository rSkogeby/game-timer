import { useNavigation as upstream, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { ParamList } from '../lib/navigation'

export default function useNavigation<RouteName extends keyof ParamList> (): [StackNavigationProp<ParamList, RouteName>, ParamList[RouteName]] {
  return [upstream<StackNavigationProp<ParamList, RouteName>>(), (useRoute().params ?? {}) as any as ParamList[RouteName]]
}
