import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as Speech from 'expo-speech'
import { useIsFocused } from "@react-navigation/native"

interface Return {
  countdown: number
  startCountdown: (initialValue: number) => void
}

export default function useCountdown (): Return {
  const isFocused = useIsFocused()
  const [countdown, setCountdown] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const startCountdown = (initialValue: number) => {
    setCountdown(initialValue)
    if (initialValue < 3100) {
      Speech.speak(Math.round(initialValue / 1000).toString())
    }

    if (initialValue < 0.1) return

    timeoutRef.current = setTimeout(() => { startCountdown(initialValue - 1000) }, 1000)
  }

  useEffect(() => {
    if (!isFocused) clearTimeout(timeoutRef.current)
  }, [isFocused])

  useEffect(() => clearTimeout(timeoutRef.current), [])

  return useMemo(() => ({
    countdown,
    startCountdown
  }), [countdown])
}
