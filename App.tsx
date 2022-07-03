import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/screen/Landing';

const RootStack = createNativeStackNavigator();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Landing'>
        <RootStack.Screen name="Landing" component={Landing} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}



export default App
