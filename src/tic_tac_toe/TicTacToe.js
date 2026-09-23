import React, { useState } from 'react'

const TicTacToe = () => {
  const [isStart, setIsStart] = useState(false);
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill('')));
  const [count, setCount] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (board) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) { 
        return board[i][0];
      } 
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) { 
        return board[0][i];
      } 
    }
    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) { 
      return board[0][0];
    } 
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) { 
      return board[0][2];
    } 
    return null;
  }

  const handleStart = () => {
    console.log("Game Started");
    setIsStart(true);
    setBoard(Array(3).fill().map(() => Array(3).fill('')))
    setCount(1);
    setWinner(null);
    // setGameOver(false);
  }
  const handleClickSelectedBox = (i, j) => {
    if(!isStart) {
      alert("Please start the game first!");
      return;
    }
    if (board[i][j] !== '') {
      alert("This cell is already taken!");
      return;
    }
    const newBoard = board.map(row => [...row]);
    const currentPlayer = count % 2 !== 0 ? 'X' : 'O'
    newBoard[i][j] = currentPlayer;
    setBoard(newBoard);
    setCount(prev => prev + 1);
    console.log('selected box:', i, j, 'Player:', newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      alert(`Player ${gameWinner} wins!`);
      setIsStart(false);
      setGameOver(true);
    } else if (count === 9) {
      alert("It's a draw!");
      setIsStart(false);
      setGameOver(true);
    }
  }
  const grid = Array.from({length: 3}, (_, i) => 
    Array.from({length: 3}, (_, j) => <button key={`${i}-${j}`} style={{width: '60px', height: '60px', fontSize: '24px', margin: '2px'}} onClick={() => handleClickSelectedBox(i, j)}>{board[i][j]}</button>
  ));
  return (<>
    <button style={{border: '2px solid #ddd', background:'gray', color: '#202025', padding:'10px', cursor: 'pointer'}} onClick={handleStart}>{isStart ? 'Restart Game' : 'Start Game'}</button>
    {isStart && !gameOver && (
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          Current Player: <strong>{count % 2 !== 0 ? 'X' : 'O'}</strong>
        </p>
      )}
      
      {winner && (
        <p style={{ fontSize: '20px', fontWeight: 'bold', color: winner === 'Draw' ? 'orange' : 'green' }}>
          {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
        </p>
      )}
    <div style={{textAlign: 'center', marginTop: '20px'}}>
      {grid.map((row, i) => (
        <div key={i}>{row}</div>
      ))}
    </div>
    </>
  )
}

export default TicTacToe
