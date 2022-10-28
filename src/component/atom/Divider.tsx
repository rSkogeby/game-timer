import { StyleSheet, View } from 'react-native'

const DEFAULT_DIVIDER_COLOR = '#E5E5E5'

interface DividerProps {
  color?: string
}

const Divider: React.FC<DividerProps> = ({ color = DEFAULT_DIVIDER_COLOR }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: StyleSheet.hairlineWidth
      }}
    />
  )
}

export default Divider
