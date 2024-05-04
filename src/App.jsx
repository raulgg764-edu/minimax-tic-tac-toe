
import { useState } from 'react'
import './App.css'
import Board from './components/board'
import PropTypes from 'prop-types';

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

  const handleRestart = () => {
    setGameStatus('init');
  }

  function WinnerBlock({winner}){
    
    WinnerBlock.propTypes={
      winner: PropTypes.string
    }

    return (
      <div className='winnerBack winnerSelection'>
        <div className='winnerBlock winnerSelection'>
          <h2>El ganador es</h2>
          <span>{winner}</span>
        </div>
      </div>
    )
  }

  return (
    <main className=''>
      <h1 >Tic-Tac-Toe</h1>

      {gameStatus === 'init' &&
        <form onSubmit={handleStart}>
          <label style={{fontSize:"25px"}}> Selecciona tu simbolo: 
            <select name='player'>
              <option value={'X'}>X</option>
              <option value={'O'}>O</option>
            </select>
          </label>

          <button type='submit'>Iniciar juego</button>
        </form>
      }

      {gameStatus !== 'init' &&
        <>
          <button className='restart' onClick={handleRestart}>⟳</button>
          <Board  players={players} setGameStatus={setGameStatus} setWinner={setWinner} gameStatus={gameStatus}/>
        </>
      }
      {
        gameStatus === 'end' &&
        <WinnerBlock style={{visibility: gameStatus==='end'?'visible':'hidden'}}  winner={winner}/>
      }

    </main>
  )
}

export default App
