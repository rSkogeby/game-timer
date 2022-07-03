import React from 'react'
import { Control, Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import Input, { InputProps } from 'react-native-elements/dist/input/Input'
import ErrorField from './ErrorField'

type ColorValue = string

interface TextFieldProps<TFieldValues extends FieldValues> {
  autoFocus?: boolean
  /** Defaults to none */
  autoCapitalize?: InputProps['autoCapitalize']
  /** Defaults to off */
  autoComplete?: InputProps['autoComplete']
  backgroundColor?: ColorValue
  defaultValue?: string
  disabled?: boolean
  form: UseFormReturn<TFieldValues>
  icon?: JSX.Element
  labelTextColor?: ColorValue
  name: (keyof TFieldValues & string) | string
  onBlur?: () => void
  onFocus?: () => void
  password?: boolean
  passwordMaskColor?: ColorValue
  passwordShowColor?: ColorValue
  placeholder?: string
  rightIcon?: JSX.Element
  textAlign?: 'left' | 'center' | 'right'
  textColor?: ColorValue
  textContentType?: InputProps['textContentType']
  title?: string
  type?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search'
}

interface ControlledTextFieldProps {
  autoFocus?: boolean
  /** Defaults to none */
  autoCapitalize?: InputProps['autoCapitalize']
  /** Defaults to off */
  autoComplete?: InputProps['autoComplete']
  backgroundColor?: ColorValue
  disabled?: boolean
  icon?: JSX.Element
  labelTextColor?: ColorValue
  onBlur?: () => void
  onChange: (input: string) => void
  onFocus?: () => void
  password?: boolean
  passwordMaskColor?: ColorValue
  passwordShowColor?: ColorValue
  placeholder?: string
  rightIcon?: JSX.Element
  textAlign?: 'left' | 'center' | 'right'
  textColor?: ColorValue
  textContentType?: InputProps['textContentType']
  title?: string
  type?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search'
  value: string | null | undefined
}

export function TextField<T extends FieldValues> (props: TextFieldProps<T> | ControlledTextFieldProps): JSX.Element {
  if ('form' in props) {
    const errorMessage = props.form.formState.errors?.[props.name]?.message as string
    const isError = errorMessage != null

    return (
      <>
        <Controller
          control={props.form.control as Control<Record<string, any>> | undefined}
          defaultValue={props.defaultValue ?? ''}
          name={props.name}
          render={({ field: { onBlur, onChange, value } }) => {
            const handleBlur = (): void => {
              onBlur()
              props.onBlur?.()
            }

            return (
              <Input
                autoCapitalize={props.autoCapitalize ?? 'none'}
                autoComplete={props.autoComplete ?? 'off'}
                autoCompleteType={props.autoComplete ?? 'off'}
                autoFocus={props.autoFocus}
                containerStyle={{ backgroundColor: props.backgroundColor }}
                disabled={props.disabled}
                inputContainerStyle={!isError ? undefined : { borderColor: 'red', borderRadius: 4, borderWidth: 1 }}
                keyboardType={props.type}
                label={props.title}
                labelProps={{ style: { color: props.labelTextColor } }}
                leftIcon={props.icon}
                onBlur={handleBlur}
                onChangeText={(input) => onChange(input)}
                onFocus={props.onFocus}
                placeholder={props.placeholder}
                style={{ color: isError ? 'red' : props.textColor }}
                textAlign={props.textAlign}
                textContentType={props.textContentType}
                value={value}
              />
            )
          }}
        />

        {errorMessage == null ? null : (
          <ErrorField message={errorMessage} />
        )}
      </>
    )
  }

  return (
    <Input
      autoCapitalize={props.autoCapitalize ?? 'none'}
      autoComplete={props.autoComplete ?? 'off'}
      autoCompleteType={props.autoComplete ?? 'off'}
      autoFocus={props.autoFocus}
      containerStyle={{ backgroundColor: props.backgroundColor, maxWidth: 300 }}
      disabled={props.disabled}
      keyboardType={props.type}
      label={props.title}
      labelProps={{ style: { color: props.labelTextColor } }}
      leftIcon={props.icon}
      onBlur={props.onBlur}
      onChangeText={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      style={{ color: props.textColor }}
      textAlign={props.textAlign}
      textContentType={props.textContentType}
      value={props.value ?? undefined}
    />
  )
}
