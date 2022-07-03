import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text } from 'react-stacked'

interface ButtonProps {
  backgroundColor?: string
  onPress?: () => void
  paddingHorizontal?: number
  paddingVertical?: number
  height?: number
  maxWidth?: number
  textColor?: string
  title?: string
}

const Button: React.FC<ButtonProps> = ({ backgroundColor, onPress, paddingHorizontal = 16, paddingVertical = 8, maxWidth, textColor, title }) => {
  const style = { backgroundColor, borderRadius: 24, maxWidth, paddingHorizontal, paddingVertical } as const

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <HStack
        {...style}
      >
        {title == null ? null : <Text color={textColor} size={16}>{title}</Text>}
      </HStack>
    </TouchableOpacity>
  )
}

export default Button
