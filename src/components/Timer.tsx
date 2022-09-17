import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps{
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if(timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE
      ?  decrementWhiteTimer
      :  decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev > 0 ? prev - 1 : 0)
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev > 0 ? prev - 1 : 0)
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button className="btn" onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Белые - {Math.floor(whiteTime / 60)}:{(whiteTime % 60) < 10 ? '0' + (whiteTime % 60) : (whiteTime % 60)}</h2>
      <h2>Черные - {Math.floor(blackTime / 60)}:{(blackTime % 60) < 10 ? '0' + (blackTime % 60) : (blackTime % 60)}</h2>
    </div>
  );
};

export default Timer;
