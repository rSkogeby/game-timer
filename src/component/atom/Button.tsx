import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, Text } from 'react-stacked'

interface ButtonProps {
  title?: string
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <TouchableOpacity>
      <HStack>
        {title == null ? null : <Text>{title}</Text>}
      </HStack>
    </TouchableOpacity>
  )
}

export default Button
