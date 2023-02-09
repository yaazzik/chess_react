import "./App.css"
import Navbar from "./components/Navbar";
import ChessBoard from "./components/chess/ChessBoard";


const App = () => {

  return (
    <div className="app">
      <Navbar className="navbar" />
      <ChessBoard />
    </div>
  );
};

export default App;
