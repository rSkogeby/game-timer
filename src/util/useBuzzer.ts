import { Audio } from 'expo-av'

import * as buzzer from '../../assets/buzzer.wav'

const buzzerDuration = 1185
const buzzerPromise = Audio.Sound.createAsync(buzzer, { volume: 0.8 })

type PlayBuzzer = (callback?: () => void) => void

export default function useBuzzer (): PlayBuzzer {
  return (callback) => {
    buzzerPromise.then(async ({ sound }) => {
      const rate = 1 + Math.random() * 0.1

      await sound.replayAsync({ rate })

      if (callback != null) {
        setTimeout(callback, buzzerDuration / rate)
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
