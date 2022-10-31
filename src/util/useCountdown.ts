import { useEffect, useMemo, useState } from 'react'

interface Return {
  cancelCountdown: () => void
  countdown: number
  countdownState: 'idle' | 'counting' | 'finished'
  startCountdown: (initialValue: number) => void
}

export default function useCountdown (): Return {
  const [countdown, setCountdown] = useState(0)
  const [countdownRef, setCountdownRef] = useState<NodeJS.Timeout>()

  const cancelCountdown = (): void => {
    clearTimeout(countdownRef)
    setCountdownRef(undefined)
  }

  const startCountdown = (initialValue: number): void => {
    setCountdown(initialValue)

    if (initialValue < 0.1) return

    setCountdownRef(setTimeout(() => { startCountdown(initialValue - 1000) }, 1000))
  }

  useEffect(() => {
    return () => {
      clearTimeout(countdownRef)
      setCountdownRef(undefined)
    }
  }, [])

  return useMemo(() => ({
    cancelCountdown,
    countdown,
    countdownState: countdownRef == null ? 'idle' : 'counting',
    startCountdown
  }), [cancelCountdown, countdown, startCountdown, countdownRef])
}
