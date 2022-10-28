import { VStack } from 'react-stacked'
import Controller, { FieldValues, UseFormReturn } from '../atom/Controller'
import Divider from '../atom/Divider'
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
  return (
    <Controller
      defaultValue={props.defaultValue}
      form={props.form}
      name={props.name}
      render={({ errorMessage, onChange, onBlur, value }) => {
        const textColor = errorMessage == null ? '#000000' : '#ff0000'

        const handleBlur = (): void => {
          onBlur()
          props.onBlur?.()
        }

        return (
          <VStack>
            {props.title == null ? null : <Label color={textColor}>{props.title}</Label>}

            <TextInput
              autoFocus={props.autoFocus}
              onBlur={handleBlur}
              onChange={onChange}
              onFocus={props.onFocus}
              placeholder={props.placeholder}
              textColor={textColor}
              value={value}
              type={props.type}
            />

            <Divider color={textColor} />
          </VStack>
        )
      }}
    />
  )
}
