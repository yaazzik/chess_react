import './App.css'
import Navbar from './components/Navbar'
import ChessBoard from './components/board/ChessBoard'

const App = () => {
  return (
    <div className="app">
      <Navbar className="navbar" />
      <ChessBoard />
    </div>
  )
}

export default App
