import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useRef } from 'react'

import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'

const RootStack = createNativeStackNavigator()

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  return (
    <NavigationContainer linking={linkingOptions} ref={navigation}>
      <RootStack.Navigator initialRouteName='Landing'>
        <RootStack.Screen name='Landing' component={Landing} />
        <RootStack.Screen name='Timer' component={Timer} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App
