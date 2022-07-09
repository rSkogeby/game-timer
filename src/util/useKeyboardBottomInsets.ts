import { Platform } from 'react-native'

import useKeyboardHeight from './useKeyboardHeight'

export default function useKeyboardBottomInsets (): number {
  const keyboardHeight = useKeyboardHeight()
  return (Platform.OS === 'android' ? 0 : keyboardHeight)
}
