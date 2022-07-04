import React, { createContext, createElement, useCallback, useContext, useMemo, useState } from "react";
import { Player } from "../screen/Landing";

interface Result {
  clearPlayers: () => void
  players: Player[]
  updatePlayers: (players: Player[]) => void
}

export const PlayerContext = createContext<Result>(null as never)

export const PlayerProvider: React.FC = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([])

  const clearPlayers = useCallback(async () => {
    setPlayers([])
  }, [])

  const updatePlayers = useCallback(async (players: Player[]) => {
    setPlayers(players)
  }, [])

  const value = useMemo(() => {
    return { clearPlayers, players, updatePlayers }
  }, [clearPlayers, players])

  return createElement(PlayerContext.Provider, { value }, children)
}

export default function usePlayers (): Result {
  return useContext(PlayerContext)
}
