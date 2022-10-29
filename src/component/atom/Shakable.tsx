import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'
import { Animated, Platform } from 'react-native'

export interface ShakableApi {
  shake: () => void
}

interface Props {
  ref?: React.Ref<ShakableApi>
  children: ReactNode
}

const Shakable: React.FC<Props> = forwardRef(({ children }, ref) => {
  const shakeAnimationValue = useRef(new Animated.Value(0)).current

  useImperativeHandle(ref, () => ({
    shake (): void {
      shakeAnimationValue.setValue(0)
      Animated.timing(shakeAnimationValue, {
        duration: 375,
        toValue: 3,
        useNativeDriver: Platform.OS !== 'web'
      }).start()
    }
  }))

  const translateX = shakeAnimationValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0]
  })

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  )
})

export default Shakable
