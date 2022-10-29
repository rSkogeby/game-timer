import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useRef } from 'react'
import { Image } from 'react-native'

import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'
import { PlayerProvider } from './src/util/usePlayers'
import { ScaledSizesProvider } from './src/util/useScaledSizes'
import useTheme from './src/util/useTheme'

const RootStack = createStackNavigator()

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  const { theme } = useTheme()

  return (
    <ScaledSizesProvider>
      <PlayerProvider>
        <NavigationContainer linking={linkingOptions} ref={navigation}>
          <RootStack.Navigator initialRouteName='Landing' screenOptions={{ headerTitle: () => <Image source={require('./assets/full_logo.png')} style={{ resizeMode: 'contain', width: 120 }} />, headerTintColor: theme.primary.main }}>
            <RootStack.Screen name='Settings' component={Landing} />
            <RootStack.Screen name='Timer' component={Timer} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </ScaledSizesProvider>
  )
}

export default App
