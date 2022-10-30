import { NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

import NavigationContainer from './src/component/molecule/NavigationContainer'
import NavigationRootStack from './src/component/molecule/NavigationRootStack'
import { ParamList, linkingOptions } from './src/lib/navigation'
import Landing from './src/screen/Landing'
import Timer from './src/screen/Timer'
import { PlayerProvider } from './src/util/usePlayers'
import { ScaledSizesProvider } from './src/util/useScaledSizes'
import useTheme from './src/util/useTheme'

const RootStack = createStackNavigator()

function Animate (value: Animated.Value, options: { duration: number, toValue: number }): Animated.CompositeAnimation {
  return Animated.timing(value, { easing: Easing.inOut(Easing.exp), useNativeDriver: true, ...options })
}

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  const { theme } = useTheme()
  const [appIsReady, setAppIsReady] = useState(false)
  const backgroundColor = theme.background.main

  const iconMovement = useRef(new Animated.Value(-135)).current
  const logoScale = useRef(new Animated.Value(0)).current
  const opacityFade = useRef(new Animated.Value(1)).current
  const textMovement = useRef(new Animated.Value(55)).current

  useEffect(() => {
    Animate(logoScale, { duration: 500, toValue: 1 }).start(({ finished }) => {
      if (finished) {
        Animate(iconMovement, { duration: 2000, toValue: 0 }).start()
        Animate(textMovement, { duration: 2000, toValue: -100 }).start(({ finished }) => {
          if (finished) {
            Animate(opacityFade, { duration: 1000, toValue: 0 }).start(({ finished }) => {
              if (finished) {
                setAppIsReady(true)
              }
            })
          }
        })
      }
    })
  }, [])

  return (
    <ScaledSizesProvider>
      <PlayerProvider>
        <NavigationContainer linkingOptions={linkingOptions} ref={navigation}>
          {appIsReady
            ? null
            : (
              <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor, opacity: opacityFade, zIndex: 1 }}>
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
                    source={require('./assets/icon_gradient.png')}
                    style={{
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
              </Animated.View>
              )}

          <NavigationRootStack initialRouteName='Landing'>
            <RootStack.Screen name='Settings' component={Landing} />
            <RootStack.Screen name='Timer' component={Timer} />
          </NavigationRootStack>
        </NavigationContainer>
      </PlayerProvider>
    </ScaledSizesProvider>
  )
}

export default App
