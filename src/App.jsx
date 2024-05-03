
import { useState } from 'react'
import './App.css'
import Board from './components/board'

function App() {

  const [gameStatus, setGameStatus] = useState('init');
  const [players, setPlayers]=useState({player: 'X', machine: 'O'})
  const [winner, setWinner] = useState('')
  

  const handleStart = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target)
    const selection = Object.fromEntries(formData.entries()).player
    
    setGameStatus('start');

    const  playerSelection = selection === 'X' ?{player: 'X', machine: 'O'} : {player: 'O', machine: 'X'}
    setPlayers(playerSelection)
  }

  return (
    <main className=''>
      <h1>Tic-Tac-Toe</h1>

      {gameStatus === 'init' &&
        <form onSubmit={handleStart}>
          <label> Selecciona tu simbolo: 
            <select name='player'>
              <option value={'X'}>X</option>
              <option value={'O'}>O</option>
            </select>
          </label>

          <button type='submit'>Iniciar juego</button>
        </form>
      }

      {gameStatus !== 'init' &&
        <Board  players={players} setGameStatus={setGameStatus} setWinner={setWinner} gameStatus={gameStatus}/>
      }
      {
        gameStatus === 'end' &&
        <h1>{winner}</h1>
      }

      
    </main>
  )
}

export default App
