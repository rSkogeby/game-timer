import { ActivityIndicator } from 'react-native'
import Spacer from 'react-spacer'
import { HStack, Text, VStack } from 'react-stacked'

import useScaledSizes from '../../util/useScaledSizes'

import Icon, { IconName } from './Icon'
import Pressable, { DisabledProps, PressableProps } from './Pressable'

export const DISABLED_BUTTON_COLOR = '#1c1b1f1e'
export const DISABLED_BUTTON_TEXT_COLOR = '#1c1b1f61'

export type IconPosition = 'left' | 'top'

interface InternalButtonProps {
  backgroundColor?: string
  basis?: number
  borderColor?: string
  borderWidth?: number
  grow?: number
  height?: number
  iconElement?: JSX.Element
  iconName?: IconName
  /** @defaultValue 'left' */
  iconPosition?: IconPosition
  loading?: boolean
  maxWidth?: number
  minHeight?: number
  padding?: number
  paddingHorizontal?: number
  textColor?: string
  textSize?: number
  title?: string
  width?: number
}

export type ButtonProps = InternalButtonProps & PressableProps & DisabledProps

const Button: React.FC<ButtonProps> = ({ backgroundColor, basis, borderColor, borderWidth, grow, height, iconElement, iconName, iconPosition = 'left', loading = false, maxWidth, minHeight, padding, paddingHorizontal, textColor, textSize, title, width, ...pressableProps }) => {
  const { labelSize } = useScaledSizes()

  const internalTextColor = (pressableProps.disabled ?? false) ? DISABLED_BUTTON_TEXT_COLOR : textColor
  const internalBackgroundColor = (pressableProps.disabled ?? false) ? DISABLED_BUTTON_COLOR : backgroundColor

  const Stack = iconPosition === 'top' ? VStack : HStack

  const icon = iconElement ?? (
    iconName == null
      ? null
      : <Icon color={internalTextColor} name={iconName} />
  )

  const iconTitleSpacer = icon == null || title == null || title === ''
    ? null
    : iconPosition === 'top'
      ? null
      : <Spacer width={8} />

  return (
    <Pressable {...pressableProps}>
      <Stack
        alignItems='center'
        backgroundColor={internalBackgroundColor}
        basis={basis}
        borderColor={borderColor}
        borderRadius={24}
        borderWidth={borderWidth}
        grow={grow}
        height={height}
        justifyContent='center'
        maxWidth={maxWidth}
        minHeight={minHeight}
        padding={padding}
        paddingHorizontal={paddingHorizontal}
        width={width}
      >
        {loading
          ? (
            <ActivityIndicator color={internalTextColor} size='large' />
            )
          : (
            <>
              {icon}

              {iconTitleSpacer}

              <Text color={internalTextColor} size={textSize ?? labelSize} weight='600'>{title}</Text>
            </>
            )}
      </Stack>
    </Pressable>
  )
}

export default Button
