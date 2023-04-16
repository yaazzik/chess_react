import { useEffect, useState } from 'react'
import { Player } from '../../models/Player'
import { Colors } from '../../models/Colors'
import { Board } from '../../models/Board'
import LostFigures from '../LostFigures'
import BoardComponent from './BoardComponent'
import Timer from '../Timer'

const ChessBoard = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart () {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function changePlayer () {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="content">
      <Timer currentPlayer={currentPlayer} restart={restart}/>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
      <div>
        <LostFigures title={'Черные фигуры'} figures={board.lostBlackFigures}/>
      </div>
      <div>
        <LostFigures title={'Белые фигуры'} figures={board.lostWhiteFigures}/>
      </div>
    </div>
  )
}

export default ChessBoard
