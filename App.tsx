import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo, useRef, useState } from 'react'
import { Animated, Easing, Image } from 'react-native'
import Spacer from 'react-spacer'

import RectangleButton from './src/component/molecule/RectangleButton'
import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'
import { PlayerProvider } from './src/util/usePlayers'
import { ScaledSizesProvider } from './src/util/useScaledSizes'
import useTheme from './src/util/useTheme'

const RootStack = createStackNavigator()

// SplashScreen.preventAutoHideAsync().catch(console.warn)

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  const { theme } = useTheme()
  const [appIsReady, setAppIsReady] = useState(false)
  const backgroundColor = theme.background.main

  const screenOptions: StackNavigationOptions = useMemo(() => ({
    headerTitle: () => <Image source={require('./assets/full_logo.png')} style={{ resizeMode: 'contain', width: 120 }} />,
    headerTintColor: theme.primary.main
  }), [theme.primary.main])

  const logoScale = useRef(new Animated.Value(0)).current
  const iconMovement = useRef(new Animated.Value(-135)).current
  const textMovement = useRef(new Animated.Value(55)).current

  const handleToggle = (): void => {
    Animated.timing(logoScale, { duration: 500, easing: Easing.inOut(Easing.exp), toValue: 1, useNativeDriver: true }).start(({ finished }) => {
      if (finished) {
        Animated.timing(iconMovement, { duration: 2000, easing: Easing.inOut(Easing.exp), toValue: 0, useNativeDriver: true }).start()
        Animated.timing(textMovement, { duration: 2000, easing: Easing.inOut(Easing.exp), toValue: -100, useNativeDriver: true }).start(({ finished }) => {
          if (finished) {
            setAppIsReady(true)
          }
        })
      }
    })
  }

  if (!appIsReady) {
    return (
      <Animated.View style={{ backgroundColor, flexGrow: 1 }}>
        <Animated.View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
          <Animated.View
            style={{
              backgroundColor,
              height: '100%',
              left: 0,
              position: 'absolute',
              transform: [{ translateX: iconMovement }],
              width: '50%',
              zIndex: 2
            }}
          />

          <Animated.Image
            source={require('./assets/icon.png')}
            style={{
              backgroundColor,
              position: 'absolute',
              resizeMode: 'contain',
              transform: [{ scale: logoScale }, { translateX: iconMovement }],
              zIndex: 2,
              width: 120
            }}
          />

          <Animated.Image
            source={require('./assets/logo_text.png')}
            style={{
              position: 'absolute',
              resizeMode: 'contain',
              transform: [{ scale: logoScale }, { translateX: textMovement }],
              zIndex: 1,
              width: 300
            }}
          />
        </Animated.View>

        <Spacer height={12} />

        <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <RectangleButton
            accentColor='orange'
            onPress={handleToggle}
            title='Toggle'
            type='filled'
          />
        </Animated.View>

        <Spacer height={36} />
      </Animated.View>
    )
  }

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
