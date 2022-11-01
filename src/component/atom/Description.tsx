import { ReactNode } from 'react'
import { Text } from 'react-stacked'

import useScaledSizes from '../../util/useScaledSizes'

interface DescriptionProps {
  children: ReactNode
  color?: string
}

/**
 * Descriptions are used where a longer text is needed to describe an element.
 */
const Description: React.FC<DescriptionProps> = ({ children, color }) => {
  const { descriptionTextSize } = useScaledSizes()

  return (
    <Text
      color={color}
      size={descriptionTextSize}
    >
      {children}
    </Text>
  )
}

export default Description
