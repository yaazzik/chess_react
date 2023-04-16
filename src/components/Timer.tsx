import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { Player } from '../models/Player'
import { Colors } from '../models/Colors'

interface TimerProps{
  currentPlayer: Player | null;
  restart: () => void;
  playersTime?: number;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, playersTime = 300 }) => {
  const [blackTime, setBlackTime] = useState(playersTime)
  const [whiteTime, setWhiteTime] = useState(playersTime)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer () {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE
      ? decrementWhiteTimer
      : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer () {
    setBlackTime(prev => prev > 0 ? prev - 1 : 0)
  }

  function decrementWhiteTimer () {
    setWhiteTime(prev => prev > 0 ? prev - 1 : 0)
  }

  const handleRestart = () => {
    setWhiteTime(playersTime)
    setBlackTime(playersTime)
    restart()
  }

  return (
    <div>
      <div>
        <button className="btn" onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {Math.floor(blackTime / 60)}:{(blackTime % 60) < 10 ? '0' + (blackTime % 60) : (blackTime % 60)}</h2>
      <h2>Белые - {Math.floor(whiteTime / 60)}:{(whiteTime % 60) < 10 ? '0' + (whiteTime % 60) : (whiteTime % 60)}</h2>
        {whiteTime === 0
          ? (
                <div>
                    Черные победили по времени
                </div>
            )
          : blackTime === 0
            ? (
                <div>
                    Белые победили по времени
                </div>)
            : null
        }
    </div>
  )
}

export default memo(Timer)
