import { useState } from "react";
import '../styles/board.css'
import PropTypes from 'prop-types';
import { minimax } from "../services/minimax";


export default function Board({players}){
    const initBoard = Array(9).fill(' ')
    //const userTurn='x';

    const [board, setBoard] = useState(initBoard);


    const handleTurn = (e, index) =>{
        // get old board
        const newBoard = [...board];
        newBoard[index] === ' ' ? newBoard[index] = players.player:newBoard[index];

        const bestGameInfo = minimax(newBoard, players, players.machine);
        
        //set new board
        setBoard(newBoard);

        
    }

    return (
        <>
            <ul className="board">
                {board.map((value,index)=>
                  <li className="boardSlot" key={index} onClick={(e)=>{handleTurn(e,index)}}>{value}</li>                
                )

                }
            </ul>
        </>
    )
}

Board.propTypes={
    players: PropTypes.object
}
