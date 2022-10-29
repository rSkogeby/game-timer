import Spacer from 'react-spacer'
import { VStack } from 'react-stacked'

import useTheme from '../../util/useTheme'
import Controller, { FieldValues, UseFormReturn } from '../atom/Controller'
import Label from '../atom/Label'
import TextInput, { TextInputType } from '../atom/TextInput'

interface FormTextInputProps<TFieldValues extends FieldValues> {
  autoFocus?: boolean
  defaultValue?: string
  form: UseFormReturn<TFieldValues>
  name: (keyof TFieldValues & string) | string
  onBlur?: () => void
  onFocus?: () => void
  placeholder?: string
  title?: string
  type: TextInputType
}

export default function FormTextInput<T extends FieldValues> (props: FormTextInputProps<T>): JSX.Element {
  const { theme } = useTheme()

  return (
    <Controller
      defaultValue={props.defaultValue}
      form={props.form}
      name={props.name}
      render={({ errorMessage, onChange, onBlur, value }) => {
        const textColor = errorMessage == null ? '#000000' : theme.error.main
        const backgroundColor = errorMessage == null ? theme.background.light : theme.error.light
        const borderColor = errorMessage == null ? undefined : theme.error.dark

        const handleBlur = (): void => {
          onBlur()
          props.onBlur?.()
        }

        return (
          <VStack>
            {props.title == null
              ? null
              : (
                <>
                  <Label color={textColor}>{props.title}</Label>

                  <Spacer height={8} />
                </>
                )}

            <TextInput
              autoFocus={props.autoFocus}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              onBlur={handleBlur}
              onChange={onChange}
              onFocus={props.onFocus}
              placeholder={props.placeholder}
              textColor={textColor}
              value={value}
              type={props.type}
            />
          </VStack>
        )
      }}
    />
  )
}
