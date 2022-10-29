import { StyleSheet } from 'react-native'
import unreachable from 'ts-unreachable'

import getTextColor from '../../util/getTextColor'
import useScaledSizes from '../../util/useScaledSizes'
import Button, { IconPosition } from '../atom/Button'
import { IconName } from '../atom/Icon'
import { DisabledProps, PressableProps } from '../atom/Pressable'

export const ADD_COLOR_GREEN = '#79bd74'
export const SECONDARY_BUTTON_COLOR = '#1e88e5'
export const SECONDARY_OUTLINE_COLOR = '#79747e'
export const DELETE_COLOR_RED = '#da534f'
export const SHOW_COLOR_BLUE = '#f4f8f5'

export type RectangleButtonType = 'filled' | 'outlined' | 'text' | 'tonal'

interface InternalRectangleButtonProps {
  accentColor: string
  basis?: number
  grow?: number
  height?: number
  loading?: boolean
  iconElement?: JSX.Element
  iconName?: IconName
  /** Default: left */
  iconPosition?: IconPosition
  maxWidth?: number
  padding?: number
  textSize?: number
  title?: string
  type: RectangleButtonType
  width?: number
}

export type RectangleButtonProps = InternalRectangleButtonProps & PressableProps & DisabledProps

const RectangleButton: React.FC<RectangleButtonProps> = ({ accentColor, type, ...props }) => {
  const { rectangleButtonHorizontalPadding, rectangleButtonMinHeight } = useScaledSizes()

  const minHeight = props.height ?? rectangleButtonMinHeight
  const paddingHorizontal = props.width == null ? rectangleButtonHorizontalPadding : undefined

  if (type === 'filled') {
    const backgroundColor = accentColor
    const textColor = getTextColor(backgroundColor)

    return (
      <Button
        {...props}
        backgroundColor={backgroundColor}
        minHeight={minHeight}
        paddingHorizontal={paddingHorizontal}
        textColor={textColor}
      />
    )
  }

  if (type === 'outlined') {
    const backgroundColor = 'transparent'
    const textColor = accentColor

    return (
      <Button
        {...props}
        backgroundColor={backgroundColor}
        borderColor={SECONDARY_OUTLINE_COLOR}
        borderWidth={StyleSheet.hairlineWidth}
        minHeight={minHeight}
        paddingHorizontal={paddingHorizontal}
        textColor={textColor}
      />
    )
  }

  if (type === 'text') {
    const backgroundColor = 'transparent'
    const textColor = accentColor

    return (
      <Button
        {...props}
        backgroundColor={backgroundColor}
        minHeight={minHeight}
        textColor={textColor}
      />
    )
  }

  if (type === 'tonal') {
    const backgroundColor = `${accentColor}22`
    const textColor = accentColor

    return (
      <Button
        {...props}
        backgroundColor={backgroundColor}
        minHeight={minHeight}
        paddingHorizontal={paddingHorizontal}
        textColor={textColor}
      />
    )
  }

  return unreachable(type)
}

export default RectangleButton
