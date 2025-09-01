import React, { useState } from "react";
import Board from "./Board";
import "./App.css";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    const win = checkWinner(newSquares);

    setSquares(newSquares);
    setWinner(win);
    setXIsNext(!xIsNext);

    // Simple AI move (random empty spot)
    if (!win && !xIsNext) {
      setTimeout(() => {
        const emptySquares = newSquares
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);
        if (emptySquares.length > 0) {
          const randomIndex =
            emptySquares[Math.floor(Math.random() * emptySquares.length)];
          newSquares[randomIndex] = "O";
          const winAI = checkWinner(newSquares);
          setSquares(newSquares);
          setWinner(winAI);
          setXIsNext(true);
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <h1>🎮 Tic Tac Toe</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : squares.every((sq) => sq !== null)
          ? "Draw!"
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </div>
      <button className="reset-btn" onClick={handleReset}>
        🔄 Reset Game
      </button>
    </div>
  );
};

export default App;
