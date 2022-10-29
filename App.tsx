import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useRef } from 'react'

import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'
import { PlayerProvider } from './src/util/usePlayers'
import useTheme from './src/util/useTheme'

const RootStack = createStackNavigator()

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  const { theme } = useTheme()

  return (
    <PlayerProvider>
      <NavigationContainer linking={linkingOptions} ref={navigation}>
        <RootStack.Navigator initialRouteName='Landing' screenOptions={{ headerTintColor: theme.primary.main }}>
          <RootStack.Screen name='Settings' component={Landing} />
          <RootStack.Screen name='Timer' component={Timer} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  )
}

export default App
