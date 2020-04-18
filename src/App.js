import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';
import Square from './components/Square';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setNextPlayer] = useState(PLAYER_1);
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateSquare = (chosenSquare) => {
    // 2D array -> array inside array (loop thru it to find the square we are looking for)
    const newSquares = [...squares];
    for (let checkRow = 0; checkRow < newSquares.length; checkRow++) {
      for (let checkCol = 0; checkCol < newSquares[checkRow].length; checkCol++){
        // find that square with the id
        if (newSquares[checkRow][checkCol].id === chosenSquare) {
          if (newSquares[checkRow][checkCol].value === "") {
            newSquares[checkRow][checkCol].value = currentPlayer;
            console.log(newSquares[checkRow][checkCol]);
          } else { 
            return;
          }
        }
      }
    }
    //set the state of the board
    setSquares(newSquares);
    //set the state of the turn
    if (currentPlayer === PLAYER_1){
      setNextPlayer(PLAYER_2);
    } else {
      setNextPlayer(PLAYER_1);
    }
  } 
  


  const checkForWinner = () => {
    // Complete in Wave 3

  }

  const resetGame = () => {
    // Complete in Wave 4
  }


  // to print out the current player
  let status = `Next Player is ${currentPlayer}`

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h3>{status}</h3>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare} />
      </main>
    </div>
  );
}

export default App;
