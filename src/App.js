import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState} from 'react';
import { useEffect } from 'react';
import Gameover from './components/Gameover';
import GameState from './components/GameState';
import Reset from './components/Reset';

const playerX ='X'
const playerO = 'O'

function App() {
  const [tiles,setTiles] = useState(Array(9).fill(null))

  const [playerTurn,setPlayerTurn] = useState(playerX)

  const [strikeClass, setStrikeClass] = useState();

  const [gameState,setGameState] = useState(GameState.inProgress)

  const winningCombination = [
    {combo:[0,1,2], strikeClass:'strike-row-1'},
    {combo:[3,4,5], strikeClass:'strike-row-2'},
    {combo:[6,7,8], strikeClass:'strike-row-3'},
    {combo:[0,3,6], strikeClass:'strike-column-1'},
    {combo:[1,4,7], strikeClass:'strike-column-2'},
    {combo:[2,5,8], strikeClass:'strike-column-3'},
    {combo:[0,4,8], strikeClass:'strike-diagonal-1'},
    {combo:[2,4,6], strikeClass:'strike-diagonal-2'}
  ]
  function checkWinner(tiles,setStrikeClass){
    for(const {combo,strikeClass} of winningCombination){
      const tileValue1  =  tiles[combo[0]]
      const tileValue2  =  tiles[combo[1]]
      const tileValue3 =  tiles[combo[2]]

      if(tileValue1!==null && tileValue1===tileValue2 && tileValue1 === tileValue3){
        setStrikeClass(strikeClass)
        if(tileValue1 === playerX){
          setGameState(GameState.playerXWins)
        }else{
          setGameState(GameState.playerOWins)
        }
        return
      }
    }
    let flag = 0;
    for(let i = 0;i<9;i++){
      if(tiles[i]===null){
        flag=1
      }
    }
    const areAllTilesFilled = flag!==1?true:false
    if(areAllTilesFilled){
      setGameState(GameState.draw)
    }
  }

  useEffect(() =>{
    checkWinner(tiles,setStrikeClass);
  },[tiles])



  const handleTileClick = ((index) => {
    if(gameState!==GameState.inProgress){
      return;
    }
    if(tiles[index]!==null){
      return;
    }
    const newTiles = {...tiles};
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if(playerTurn === playerX){
      setPlayerTurn(playerO)
    }else{
      setPlayerTurn(playerX)
    }
  })



  function handleReset(){
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(playerX);
    setStrikeClass(null)
  }
  return(
    <div>
      <h1>Tic Tac Toe</h1>
      <Board playerTurn={playerTurn} tiles={tiles} onTileClick = {handleTileClick} strikeClass={strikeClass}/>
        
      <Gameover gameState={gameState}/>
      <Reset gameState={gameState} handleReset={handleReset}/>
    </div>
  )
}

export default App;
