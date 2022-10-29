import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, useRef } from 'react'
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

  const screenOptions: StackNavigationOptions = useMemo(() => ({
    headerTitle: () => <Image source={require('./assets/full_logo.png')} style={{ resizeMode: 'contain', width: 120 }} />,
    headerTintColor: theme.primary.main
  }), [theme.primary.main])

  return (
    <ScaledSizesProvider>
      <PlayerProvider>
        <NavigationContainer linking={linkingOptions} ref={navigation}>
          <RootStack.Navigator initialRouteName='Landing' screenOptions={screenOptions}>
            <RootStack.Screen name='Settings' component={Landing} />
            <RootStack.Screen name='Timer' component={Timer} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PlayerProvider>
    </ScaledSizesProvider>
  )
}

export default App
