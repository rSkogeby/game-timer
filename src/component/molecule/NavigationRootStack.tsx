import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { VStack } from 'react-stacked'

import useScaledSizes from '../../util/useScaledSizes'
import useTheme from '../../util/useTheme'

const { Navigator } = createStackNavigator()

interface NavigationRootStackProps {
  children: React.ReactNode
  initialRouteName?: string
}

const NavigationRootStack: React.FC<NavigationRootStackProps> = ({ children, initialRouteName }) => {
  const { theme } = useTheme()
  const { navigationHeaderImagePadding, navigationHeaderImageWidth } = useScaledSizes()

  const screenOptions: StackNavigationOptions = useMemo(() => ({
    headerTitle: () => (
      <VStack paddingBottom={navigationHeaderImagePadding}>
        <Image
          resizeMode='contain'
          source={require('../../../assets/full_logo.png')}
          style={{
            aspectRatio: 3.71629543,
            backgroundColor: '#ffffff',
            height: undefined,
            width: navigationHeaderImageWidth
          }}
        />
      </VStack>
    ),
    headerTintColor: theme.primary.main
  }), [navigationHeaderImageWidth, theme.primary.main])

  return (
    <Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
    >
      {children}
    </Navigator>
  )
}

export default NavigationRootStack
