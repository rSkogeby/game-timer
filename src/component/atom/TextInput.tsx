import { useMemo } from 'react'
import { TextInput as Upstream, TextInputProps as UpstreamProps } from 'react-native'
import tinycolor from 'tinycolor2'
import unreachable from 'ts-unreachable'

import useScaledSizes from '../../util/useScaledSizes'

export type TextInputType =
  | 'amount'
  | 'date'
  | 'default'
  | 'digits'
  | 'password'
  | 'phone-number'
  | 'pin-code'
  | 'time'
  | 'username'

export type TextContentType = UpstreamProps['textContentType']
export type AutoComplete = UpstreamProps['autoComplete']
export type KeyboardType = UpstreamProps['keyboardType']
export type AutoCapitalize = UpstreamProps['autoCapitalize']

interface TextInputTypeSettings {
  autoCapitalize: AutoCapitalize
  autoComplete: AutoComplete
  keyboardType: KeyboardType
  secureTextEntry: boolean
  textContentType: TextContentType
}

function getTextInputTypeSettings (type: TextInputType): TextInputTypeSettings {
  switch (type) {
    case 'amount': return { autoCapitalize: 'none', autoComplete: 'off', keyboardType: 'decimal-pad', secureTextEntry: false, textContentType: 'none' }
    case 'date': return { autoCapitalize: 'none', autoComplete: 'off', keyboardType: 'number-pad', secureTextEntry: false, textContentType: 'none' }
    case 'default': return { autoCapitalize: 'sentences', autoComplete: 'off', keyboardType: 'default', secureTextEntry: false, textContentType: 'none' }
    case 'digits': return { autoCapitalize: 'none', autoComplete: 'off', keyboardType: 'number-pad', secureTextEntry: false, textContentType: 'none' }
    case 'password': return { autoCapitalize: 'none', autoComplete: 'password', keyboardType: 'default', secureTextEntry: true, textContentType: 'password' }
    case 'pin-code': return { autoCapitalize: 'none', autoComplete: 'off', keyboardType: 'number-pad', secureTextEntry: true, textContentType: 'none' }
    case 'phone-number': return { autoCapitalize: 'none', autoComplete: 'tel', keyboardType: 'phone-pad', secureTextEntry: false, textContentType: 'telephoneNumber' }
    case 'time': return { autoCapitalize: 'none', autoComplete: 'off', keyboardType: 'number-pad', secureTextEntry: false, textContentType: 'none' }
    case 'username': return { autoCapitalize: 'none', autoComplete: 'username', keyboardType: 'email-address', secureTextEntry: false, textContentType: 'username' }
    default: unreachable(type)
  }
}

interface TextInputProps {
  autoFocus?: boolean
  minHeight?: number
  multiline?: boolean
  numberOfLines?: number
  onBlur?: () => void
  onChange: (input: string) => void
  onFocus?: () => void
  placeholder?: string
  textColor?: string
  /** @defaultValue default */
  type?: TextInputType
  /** This value is implicitly set through type, but for specific use cases it can be overridden */
  textContentType?: TextContentType
  value: string | undefined
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { labelPadding, labelSize } = useScaledSizes()
  const placeholderTextColor = tinycolor(props.textColor ?? '#000000').setAlpha(0.5).toHex8String()

  const style: UpstreamProps['style'] = useMemo(() => {
    return {
      color: props.textColor,
      flexGrow: 1,
      fontSize: labelSize,
      minHeight: props.minHeight,
      paddingVertical: labelPadding
    }
  }, [labelPadding, labelSize, props.minHeight, props.textColor])

  const typeSettings = useMemo(() => {
    return getTextInputTypeSettings(props.type ?? 'default')
  }, [props.type])

  return (
    <Upstream
      {...typeSettings}
      autoFocus={props.autoFocus}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
      onBlur={props.onBlur}
      onChangeText={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType='ascii-capable'
      style={style}
      textContentType={props.textContentType ?? typeSettings.textContentType}
      value={props.value}
    />
  )
}

export default TextInput
