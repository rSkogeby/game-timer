import * as Speech from 'expo-speech'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spacer from 'react-spacer'
import { Text, VStack } from 'react-stacked'

import RectangleButton from '../component/molecule/RectangleButton'
import useCountdown from '../util/useCountdown'
import usePlayers from '../util/usePlayers'
import useTheme from '../util/useTheme'

const Timer: React.FC = () => {
  const { theme } = useTheme()
  const { players } = usePlayers()
  const insets = useSafeAreaInsets()
  const { cancelCountdown, countdown, countdownState, startCountdown } = useCountdown()
  const backgroundColor = theme.background.main
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)

  useEffect(() => {
    if (currentPlayer === null) {
      Speech.speak(players[0].name)
      setCurrentPlayer(0)
      startCountdown(Number(players[0].time) * 1000)
      return
    }

    if (currentPlayer > players.length) return
    if (countdown !== 0) return

    let nextCurrentPlayer = currentPlayer + 1
    if (nextCurrentPlayer > players.length - 1) {
      nextCurrentPlayer = 0
    }

    setCurrentPlayer(nextCurrentPlayer)
    startCountdown(Number(players[nextCurrentPlayer].time) * 1000)

    Speech.speak(players[nextCurrentPlayer].name)
  }, [countdown, currentPlayer, players, Speech])

  return (
    <VStack alignItems='center' backgroundColor={backgroundColor} grow={1}>
      <Spacer height={16} grow={1} />

      <VStack alignItems='center' justifyContent='center'>
        <TouchableOpacity onPress={() => startCountdown(Number(players[currentPlayer ?? 0].time) * 1000)}>
          <Text size={32}>{players[currentPlayer ?? 0].name}</Text>
        </TouchableOpacity>

        <Text size={88}>{Math.round(countdown / 1000)}</Text>
      </VStack>

      <Spacer height={0} grow={2} />

      <RectangleButton
        accentColor={countdownState === 'counting' ? theme.secondary.light : theme.primary.main}
        onPress={countdownState === 'counting' ? cancelCountdown : () => startCountdown(countdown)}
        title={countdownState === 'counting' ? 'Pause' : 'Resume'}
        type='filled'
      />

      <Spacer height={insets.bottom} />
    </VStack>
  )
}

export default Timer
