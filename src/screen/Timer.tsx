import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spacer from 'react-spacer'
import { VStack, Text } from 'react-stacked'
import useCountdown from '../util/useCountdown'
import usePlayers from '../util/usePlayers'
import useTheme from '../util/useTheme'

const Timer: React.FC = () => {
  const { theme } = useTheme()
  const { players } = usePlayers()
  const insets = useSafeAreaInsets()
  const { countdown, startCountdown } = useCountdown()
  const backgroundColor = theme.background.main
  const [currentPlayer, setCurrentPlayer] = useState(0)

  useEffect(() => {
    if (countdown === 0) {
      setCurrentPlayer(currentPlayer => {
        if (currentPlayer < players.length - 1) {
          return currentPlayer + 1
        }

        return 0
      })

      return
    }
  }, [countdown, players, setCurrentPlayer])

  useEffect(() => {
    if (currentPlayer > players.length) return

    startCountdown(Number(players[currentPlayer].time) * 1000)
  }, [currentPlayer, players])

  return (
    <VStack alignItems='center' backgroundColor={backgroundColor} grow={1}>
      <Text>Asd</Text>

      <Spacer height={16} />

      <VStack>
        <Text size={52}>{Math.round(countdown / 1000)}</Text>

      <Text>{players[currentPlayer].name}, {players[currentPlayer].time} s</Text>
      </VStack>

      {players.map((player, index) => (
        <Text>{player.name}, {player.time} s</Text>
      ))}

      <Spacer height={insets.bottom} />
    </VStack>
  )
}

export default Timer
