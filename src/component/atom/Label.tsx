import { ReactNode } from 'react'
import { Text } from 'react-stacked'

import useScaledSizes from '../../util/useScaledSizes'

interface LabelProps {
  children: ReactNode
  color?: string
}

/**
 * A label is a short text that is used to describe an element.
 */
const Label: React.FC<LabelProps> = ({ children, color }) => {
  const { labelSize } = useScaledSizes()

  return (
    <Text
      color={color}
      size={labelSize}
    >
      {children}
    </Text>
  )
}

export default Label
