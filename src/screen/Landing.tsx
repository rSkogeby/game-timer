import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Button from '../component/atom/Button'
import useTheme from '../util/useTheme'

const Landing: React.FC = () => {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.background.main }]}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
      <Button backgroundColor={theme.primary.main} textColor={theme.primary.text.primary} title='Setup' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Landing
