/* eslint-disable no-unused-vars */

export function winning(board, player) {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } 
    else {
      return false;
    }
  }

export function getEmptySlots(board){
    return board.filter(i => (i !== 'O' && i !== 'X'));
}

export function convertBoard(board){
  let newBoard = [...board]
  for(let i=0; i<newBoard.length;i++){
    if(newBoard[i]===' '){
      newBoard[i] = i
    }
  }
  
  return newBoard;
}

export function minimax(board, players, currentPlayer){
  
  //Obtener slots vacios del tablero en la iteración
  let availableSlots = getEmptySlots(board);
  
  if (winning(board, players.player)){
    return {score: -10} // minimizar jugador
  }else if (winning(board, players.machine)){
    return {score: 10} //Maximizar la ai 
  } else if (availableSlots.length === 0){
    return {score: 0}
  }

  let moves = []; //Arreglo de movimientos en la iteración
  for(let i=0;i<availableSlots.length;i++){
    let move = {};
    
    move.index = board[availableSlots[i]]; 
    board[availableSlots[i]] = currentPlayer;

    if(currentPlayer===players.player){
      let result = minimax(board, players, players.machine);
      move.score = result.score
    } else {
      let result = minimax(board, players, players.player);
      move.score = result.score
    }

    board[availableSlots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if(currentPlayer===players.machine){
    let bestScore = -Infinity;
    for (let i=0;i<moves.length;i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{
    let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
  }
  
  return moves[bestMove];

}