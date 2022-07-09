import { useEffect, useMemo, useRef, useState } from "react"
import * as Speech from 'expo-speech'

interface Return {
  cancelCountdown: () => void
  countdown: number
  startCountdown: (initialValue: number) => void
}

export default function useCountdown (): Return {
  const [countdown, setCountdown] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const cancelCountdown = (): void => {
    clearTimeout(timeoutRef.current)
  }

  const startCountdown = (initialValue: number) => {
    setCountdown(initialValue)
    if (initialValue < 3100) {
      Speech.speak(Math.round(initialValue / 1000).toString(), {
        language: 'en-US',
        rate: 1
      })
    }

    if (initialValue < 0.1) return

    timeoutRef.current = setTimeout(() => { startCountdown(initialValue - 1000) }, 1000)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return useMemo(() => ({
    cancelCountdown,
    countdown,
    startCountdown
  }), [cancelCountdown, countdown, startCountdown])
}
