import { useNavigation as upstream, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { ParamList } from '../lib/navigation'

export default function useNavigation<RouteName extends keyof ParamList> (): [NativeStackNavigationProp<ParamList, RouteName>, ParamList[RouteName]] {
  return [upstream<NativeStackNavigationProp<ParamList, RouteName>>(), (useRoute().params ?? {}) as any as ParamList[RouteName]]
}
