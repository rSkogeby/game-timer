import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Spacer from 'react-spacer'
import { Text, VStack } from 'react-stacked'

import CheckBox from '../component/atom/CheckBox'
import RectangleButton from '../component/molecule/RectangleButton'
import useBuzzer from '../util/useBuzzer'
import useCountdown from '../util/useCountdown'
import usePlayers from '../util/usePlayers'
import useTheme from '../util/useTheme'

const Timer: React.FC = () => {
  const { theme } = useTheme()
  const { players } = usePlayers()
  const insets = useSafeAreaInsets()
  const playBuzzer = useBuzzer()
  const { cancelCountdown, countdown, countdownState, startCountdown } = useCountdown()
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null)
  const [readName, setReadName] = useState(true)
  const [buzzerEnabled, setBuzzersEnabled] = useState(false)
  const [readCountdown, setReadCountdown] = useState(true)

  const handleReadOutNameToggle = (): void => {
    setReadName(readName => !readName)
  }

  const handleBuzzerToggle = (): void => {
    setBuzzersEnabled(buzzerEnabled => !buzzerEnabled)
  }

  const handleReadCountdownToggle = (): void => {
    setReadCountdown(readCountdown => !readCountdown)
  }

  useEffect(() => {
    if (currentPlayer === null) {
      if (readName) Speech.speak(players[0].name)
      setCurrentPlayer(0)
      startCountdown(Number(players[0].time) * 1000)
      return
    }

    if (currentPlayer > players.length) return

    if (readCountdown && countdown >= 100 && countdown < 3100) {
      Speech.speak(Math.round(countdown / 1000).toString(), {
        language: 'en-US',
        rate: 1
      })

      return
    }

    if (countdown !== 0) return

    let nextCurrentPlayer = currentPlayer + 1
    if (nextCurrentPlayer > players.length - 1) {
      nextCurrentPlayer = 0
    }

    setCurrentPlayer(nextCurrentPlayer)
    startCountdown(Number(players[nextCurrentPlayer].time) * 1000)

    if (buzzerEnabled && readName) {
      playBuzzer(() => Speech.speak(players[nextCurrentPlayer].name))
    } else if (buzzerEnabled) {
      playBuzzer()
    } else if (readName) {
      Speech.speak(players[nextCurrentPlayer].name)
    }
  }, [countdown, currentPlayer, players, readName, Speech])

  return (
    <VStack alignItems='center' backgroundColor={theme.background.main} grow={1}>
      <Spacer height={16} grow={1} />

      <VStack alignItems='center' justifyContent='center'>
        <TouchableOpacity onPress={() => startCountdown(Number(players[currentPlayer ?? 0].time) * 1000)}>
          <Text size={32}>{players[currentPlayer ?? 0].name}</Text>
        </TouchableOpacity>

        <Text size={88}>{Math.round(countdown / 1000)}</Text>
      </VStack>

      <Spacer height={16} />

      <CheckBox
        backgroundColor={theme.background.main}
        checked={readName}
        onPress={handleReadOutNameToggle}
        title='Read out names on countdown start'
      />

      <CheckBox
        backgroundColor={theme.background.main}
        checked={buzzerEnabled}
        onPress={handleBuzzerToggle}
        title='Signal end of countdown with buzzer'
      />

      <CheckBox
        backgroundColor={theme.background.main}
        checked={readCountdown}
        onPress={handleReadCountdownToggle}
        title='Read out countdown'
      />

      <Spacer height={0} grow={2} />

      <RectangleButton
        accentColor={theme.primary.main}
        onPress={countdownState === 'counting' ? cancelCountdown : () => startCountdown(countdown)}
        title={countdownState === 'counting' ? 'Pause' : 'Resume'}
        type={countdownState === 'counting' ? 'outlined' : 'filled'}
      />

      <Spacer height={insets.bottom} />
    </VStack>
  )
}

export default Timer
