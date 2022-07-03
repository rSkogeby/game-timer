import { NavigationContainer, NavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useRef } from 'react'
import { ParamList, linkingOptions } from './src/lib/navigation'

import Landing from './src/screen/Landing'

const RootStack = createNativeStackNavigator()

const App: React.FC = () => {
  const navigation = useRef<NavigationContainerRef<ParamList>>(null)
  return (
    <NavigationContainer linking={linkingOptions} ref={navigation}>
      <RootStack.Navigator initialRouteName='Landing' >
        <RootStack.Screen name='Landing' component={Landing} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App
