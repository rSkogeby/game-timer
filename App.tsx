import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useRef } from 'react'

import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'
import { PlayerProvider } from './src/util/usePlayers'

const RootStack = createStackNavigator()

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  return (
    <PlayerProvider>
      <NavigationContainer linking={linkingOptions} ref={navigation}>
        <RootStack.Navigator initialRouteName='Landing'>
          <RootStack.Screen name='Settings' component={Landing} />
          <RootStack.Screen name='Timer' component={Timer} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  )
}

export default App
