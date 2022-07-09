import { useKeyboard } from '@react-native-community/hooks'
import { useWindowDimensions } from 'react-native'

export default function useKeyboardHeight (): number {
  const { coordinates } = useKeyboard()
  const windowHeight = useWindowDimensions().height

  if (coordinates.end.screenY === 0) return 0

  return windowHeight - coordinates.end.screenY
}
