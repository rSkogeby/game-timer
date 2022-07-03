import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface Return {
  countdown: number
  startCountdown: (initialValue: number) => void
}

export default function useCountdown (): Return {
  const [countdown, setCountdown] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const onCountdownEnd = useCallback(() => {
    setCountdown(0)
    clearTimeout(timeoutRef.current)
  }, [])

  const startCountdown = (initialValue: number) => {
    setCountdown(initialValue)

    if (initialValue < 0.1) return onCountdownEnd()

    timeoutRef.current = setTimeout(() => { startCountdown(initialValue - 1000) }, 1000)
  }

  useEffect(() => clearTimeout(timeoutRef.current), [])

  return useMemo(() => ({
    countdown,
    startCountdown
  }), [countdown])
}
