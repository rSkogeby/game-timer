import { ReactNode, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'

export type DisabledProps = ({ disabled: boolean, onDisabledPress: () => void } | { disabled?: undefined, onDisabledPress?: never })

interface EnabledPressableProps {
  children?: ReactNode
  onPress: () => void
}

type InternalPressableProps = EnabledPressableProps & DisabledProps

export type PressableProps = Omit<InternalPressableProps, 'children'>

function Pressable ({ children, disabled, onDisabledPress, onPress }: InternalPressableProps): JSX.Element {
  const handlePress = useCallback(() => {
    if (disabled ?? false) {
      onDisabledPress?.()
    } else {
      onPress()
    }
  }, [disabled, onDisabledPress, onPress])

  return (
    <TouchableOpacity onPress={handlePress} style={{ flexDirection: 'row' }}>
      {children}
    </TouchableOpacity>
  )
}

export default Pressable
