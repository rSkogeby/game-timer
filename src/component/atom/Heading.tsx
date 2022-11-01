import { ReactNode } from 'react'
import { Text } from 'react-stacked'

import useScaledSizes from '../../util/useScaledSizes'

interface HeadingProps {
  children: ReactNode
  color?: string
}

/**
 * A heading is a short text that is used to describe an element used as the rubric for a section.
 */
const Heading: React.FC<HeadingProps> = ({ children, color }) => {
  const { headingTextSize } = useScaledSizes()

  return (
    <Text
      color={color}
      size={headingTextSize}
    >
      {children}
    </Text>
  )
}

export default Heading
