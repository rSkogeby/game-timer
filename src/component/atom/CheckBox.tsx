import Spacer from 'react-spacer'
import { HStack } from 'react-stacked'
import WithSeparator from 'react-with-separator'

import getFadedColor from '../../util/getFadedColor'
import getTextColor from '../../util/getTextColor'
import useTheme from '../../util/useTheme'

import { DISABLED_BUTTON_TEXT_COLOR } from './Button'
import Icon, { IconName } from './Icon'
import Label from './Label'
import Pressable, { DisabledProps, PressableProps } from './Pressable'

interface InternalCheckBoxProps {
  backgroundColor: string
  /** @defaultValue 'left' */
  checkBoxPosition?: 'left' | 'right'
  checked: boolean
  iconName?: IconName
  title?: string
  width?: number | string
  onPress: () => void
}

export type CheckBoxProps = InternalCheckBoxProps & PressableProps & DisabledProps

const CheckBox: React.FC<CheckBoxProps> = ({ backgroundColor, checkBoxPosition = 'left', checked, iconName, title, width, ...pressableProps }) => {
  const { theme } = useTheme()
  const checkBoxIconName = checked ? 'label-check-box-checked' : 'label-check-box-unchecked'
  const textColor = (pressableProps.disabled ?? false) ? DISABLED_BUTTON_TEXT_COLOR : getTextColor(backgroundColor)
  const iconColor = (pressableProps.disabled ?? false) ? DISABLED_BUTTON_TEXT_COLOR : getFadedColor(backgroundColor)
  const checkBoxColor = (pressableProps.disabled ?? false) ? DISABLED_BUTTON_TEXT_COLOR : (checked ? theme.primary.main : iconColor)

  const icon = iconName == null ? null : <Icon color={iconColor} name={iconName} />
  const checkBox = <Icon color={checkBoxColor} name={checkBoxIconName} />

  return (
    <Pressable {...pressableProps}>
      <HStack alignItems='center' grow={1} justifyContent='space-between' padding={16} width={width}>
        <HStack alignItems='center'>
          <WithSeparator separator={<Spacer width={16} />}>
            {checkBoxPosition === 'left' ? checkBox : icon}

            {title == null ? null : <Label color={textColor}>{title}</Label>}
          </WithSeparator>
        </HStack>

        <Spacer width={8} />

        {checkBoxPosition === 'right' ? checkBox : icon}
      </HStack>
    </Pressable>
  )
}

export default CheckBox
