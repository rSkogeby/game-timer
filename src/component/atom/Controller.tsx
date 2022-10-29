import dotProp from 'dot-prop'
import { Control, FieldError, FieldValues, Controller as Upstream, UseFormReturn } from 'react-hook-form'
import Spacer from 'react-spacer'
import { VStack } from 'react-stacked'
import WithSeparator from 'react-with-separator'

import ErrorField from './ErrorField'

export type { FieldValues, UseFormReturn }

interface RenderArgs {
  errorMessage: string | undefined
  onChange: (input: string) => void
  onBlur: () => void
  value: string | undefined
}

interface ControllerProps<TFieldValues extends FieldValues> {
  defaultValue?: string
  form: UseFormReturn<TFieldValues>
  name: (keyof TFieldValues & string) | string
  render: (args: RenderArgs) => JSX.Element
}

export default function Controller<T extends FieldValues> (props: ControllerProps<T>): JSX.Element {
  const errorMessage = (dotProp.get(props.form.formState.errors, props.name) as FieldError)?.message

  return (
    <VStack alignSelf='stretch' grow={1}>
      <WithSeparator separator={<Spacer height={4} />}>
        <Upstream
          control={props.form.control as Control<Record<string, any>> | undefined}
          defaultValue={props.defaultValue}
          name={props.name}
          render={({ field: { onChange, onBlur, value } }) => props.render({ errorMessage, onChange, onBlur, value })}
        />

        {errorMessage == null
          ? null
          : <ErrorField message={errorMessage} />}
      </WithSeparator>
    </VStack>
  )
}
