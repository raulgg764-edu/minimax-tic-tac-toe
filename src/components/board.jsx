import { useState } from "react";
import '../styles/board.css'
import PropTypes from 'prop-types';
import { minimax, winning } from "../services/minimax"; 
import { convertBoard } from "../services/minimax";

export default function Board({players, setGameStatus, setWinner, gameStatus}){
    const initBoard = Array(9).fill(' ')
    //const userTurn='x';

    const [board, setBoard] = useState(initBoard);
   

    const handleTurn = (e, index) =>{
        // get old board
        if(board[index]===' ' && gameStatus!=='end'){
            let newBoard = [...board];
            newBoard[index] === ' ' ? newBoard[index] = players.player:newBoard[index];
            handleWin(newBoard, players.player)
            
            
            const bestGameInfo = minimax(convertBoard(newBoard), players, players.machine).index;
            newBoard[bestGameInfo] === ' ' ? newBoard[bestGameInfo] = players.machine:newBoard[bestGameInfo]
            handleWin(newBoard, players.machine)
            
            //set new board
            setBoard(newBoard);
            handleDraw(board);
        }
    }

    const handleWin = (board, player) =>{
        if(winning(board, player)){
            setWinner(player)
            setGameStatus('end')
        }
    }

    const handleDraw = (board) =>{
         if (board.filter((i)=>(i===' ')).length===1){
            
            setWinner('Empate')
            setGameStatus('end') 
        }
    }

    return (
        <>
            <ul className="board">
                {board.map((value,index)=>
                  <li className="boardSlot" key={index} onClick={(e)=>{handleTurn(e,index)}}>{value}</li>                
                )}
            </ul>
        </>
    )
}

Board.propTypes={
    players: PropTypes.object,
    setGameStatus: PropTypes.func,
    setWinner: PropTypes.func,
    gameStatus: PropTypes.string
}
