import React, {useEffect, useState} from 'react';
import BoardComponent from "./components/BoardComponent";
import "./App.css"
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";


const App = () => {

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)


  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
   }, [])


  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function changePlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart}/>
      <BoardComponent
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      changePlayer={changePlayer}
      />
      <div>
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigures}/>
      </div>
      <div>
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures}/>
      </div>
    </div>
  );
};

export default App;
