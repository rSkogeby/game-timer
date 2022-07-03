import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Spacer from 'react-spacer'
import { HStack, VStack } from 'react-stacked'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '../component/atom/Button'
import { TextField } from '../component/atom/TextField'
import yup, { yupResolver } from '../lib/validation'
import useTheme from '../util/useTheme'

interface Player {
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
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  const form = useForm<SchemaInput>({
    criteriaMode: 'all',
    defaultValues: { players: [{ name: '', time: '0' }]},
    mode: 'onTouched',
    resolver: yupResolver(schema)
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'players'
  });

  const handleAddPlayer = (): void => {
    const players = form.getValues().players
    const defaultTime = players?.[players.length - 1].time ?? '0'
    fieldArray.append({ name: '', time: defaultTime })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flexGrow: 1, flexBasis: 0, width: '100%' }}>
      <View style={[styles.container, { backgroundColor: theme.background.main }]}>
        <Spacer height={0} grow={1} />

        {fieldArray.fields.map((field, index) => {
          return (
            <HStack alignItems='center' key={field.id} maxWidth={300}>
              <VStack grow={1}>
                <TextField
                  form={form}
                  name={`players.${index}.name`}
                  title='Name'
                />
              </VStack>

              <VStack>
                <TextField
                  form={form}
                  name={`players.${index}.time`}
                  title='Time (s)'
                  type='number-pad'
                />
              </VStack>
            </HStack>
          )
        })}

        <Button
          backgroundColor={theme.secondary.main}
          onPress={handleAddPlayer}
          textColor={theme.secondary.text.primary}
          title='Add new player'
        />

        <Spacer height={0} grow={1} />

        <Button
          backgroundColor={theme.primary.main}
          onPress={handleAddPlayer}
          textColor={theme.primary.text.primary}
          title='Start timer'
        />

        <Spacer height={insets.bottom} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Landing
