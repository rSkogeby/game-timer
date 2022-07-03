import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text } from 'react-stacked'

interface ButtonProps {
  onPress?: () => void
  paddingHorizontal?: number
  paddingVertical?: number
  title?: string
}

const Button: React.FC<ButtonProps> = ({ onPress, paddingHorizontal = 16, paddingVertical = 8, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <HStack
        backgroundColor='orange'
        borderRadius={16}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
      >
        {title == null ? null : <Text size={16}>{title}</Text>}
      </HStack>
    </TouchableOpacity>
  )
}

export default Button
