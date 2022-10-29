import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spacer from 'react-spacer'
import { HStack, VStack } from 'react-stacked'
import WithSeparator from 'react-with-separator'

import FormTextInput from '../component/molecule/FormTextInput'
import RectangleButton from '../component/molecule/RectangleButton'
import yup, { yupResolver } from '../lib/validation'
import useKeyboardBottomInsets from '../util/useKeyboardBottomInsets'
import useNavigation from '../util/useNavigation'
import usePlayers from '../util/usePlayers'
import useTheme from '../util/useTheme'

export interface Player {
  name: string
  time: string
}
interface SchemaInput {
  players: Player[]
}

const schema = yup.object().shape<SchemaInput>({
  players: yup.array().of(
    yup.object().shape<Player>({
      name: yup.string().required(),
      time: yup.string().matches(/^\d+$/, 'The field should have digits only').required()
    }).required()
  ).required()
})

const Landing: React.FC = () => {
  const [navigation] = useNavigation<'Landing'>()
  const { theme } = useTheme()
  const { updatePlayers } = usePlayers()
  const insets = useSafeAreaInsets()
  const keyboardBottomInsets = useKeyboardBottomInsets()

  const form = useForm<SchemaInput>({
    criteriaMode: 'all',
    defaultValues: { players: [{ name: '', time: '10' }] },
    mode: 'onTouched',
    resolver: yupResolver(schema)
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'players'
  })

  const handleAddPlayer = (): void => {
    const players = form.getValues().players
    const defaultTime = players?.[players.length - 1]?.time ?? '10'
    fieldArray.append({ name: '', time: defaultTime })
  }

  const handleStartTimer = (): void => {
    form.handleSubmit((input: SchemaInput): void => {
      updatePlayers(input.players)
      navigation.navigate('Timer', {})
    })().catch(() => {})
  }

  return (
    <VStack alignItems='center' backgroundColor={theme.background.main} grow={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
        <VStack alignItems='center' grow={1}>
          <Spacer grow={1} height={0} />
          <WithSeparator separator={<Spacer height={16} />} trailing>
            {fieldArray.fields.map((field, index) => {
              const handleRemovePlayer = (): void => {
                if (fieldArray.fields.length === 1) return

                fieldArray.remove(index)
              }

              return (
                <HStack key={field.id} maxWidth={480} paddingHorizontal={16}>
                  <FormTextInput
                    form={form}
                    name={`players.${index}.name`}
                    title='Name'
                    type='default'
                  />

                  <Spacer width={16} />

                  <HStack>
                    <FormTextInput
                      form={form}
                      name={`players.${index}.time`}
                      title='Time (s)'
                      type='digits'
                    />
                  </HStack>

                  <Spacer width={16} />

                  <RectangleButton
                    accentColor={theme.primary.main}
                    iconName='label-remove'
                    iconPosition='top'
                    onPress={handleRemovePlayer}
                    title='remove'
                    type='text'
                  />
                </HStack>
              )
            })}
          </WithSeparator>

          <RectangleButton
            accentColor={theme.primary.main}
            iconName='label-add'
            onPress={handleAddPlayer}
            padding={24}
            title='Add new player'
            type='text'
          />

          <Spacer height={16} grow={1} />
        </VStack>
      </ScrollView>

      <Spacer height={keyboardBottomInsets} />

      <RectangleButton
        accentColor={theme.primary.main}
        onPress={handleStartTimer}
        title='Start timer'
        type='filled'
      />

      <Spacer height={insets.bottom} />
    </VStack>
  )
}

export default Landing
