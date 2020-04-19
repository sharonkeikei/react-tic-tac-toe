import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
//import Square from './components/Square';

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

  const [squares, setSquares] = useState(generateSquares()); // TO DO: initial value, pass in a value not a function
  const [currentPlayer, setNextPlayer] = useState(PLAYER_1); // TO DO: format should be name, setName
  const [numOfSquareOccupied, setOccupySquare] = useState(1); //TO DO: name shoudl be in format of name, setName
  const [currentWinner, setWinner] = useState(null); // TO DO: format should be name, setName
  
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateSquare = (rowIndex, colIndex) => {
    // 2D array -> array inside array (loop thru it to find the square we are looking for)
    const newSquares = [...squares];
    // cease responding to clicks on the board if the game has a winner.
    if (currentWinner !== null) {
      return;
    }

    // for (let checkRow = 0; checkRow < newSquares.length; checkRow++) {
    //   for (let checkCol = 0; checkCol < newSquares[checkRow].length; checkCol++){
    //     // find that square with the id
    //     if (newSquares[checkRow][checkCol].id === chosenSquare) {
          if (newSquares[rowIndex][colIndex].value === "") {
            newSquares[rowIndex][colIndex].value = currentPlayer;
            setOccupySquare(numOfSquareOccupied + 1);
            console.log(numOfSquareOccupied);
            //console.log(`numofSquare = ${numOfSquareOccupied}`)
           // console.log(newSquares[checkRow][checkCol]);
          } else { 
            // if the square already is occupied, just return as it is.
            return;
          }
        
      
    

    //set the state of the board
    setSquares(newSquares);
    //check for winner
    const winner = checkForWinner(newSquares);
    // TO DO: checking for winner should be in check for winner function
    if (winner!== null) {
      setWinner(winner)
    } else {
      // if all 9 squares are filled but no winner - it's a tie!
      if (numOfSquareOccupied === 9) {
        setWinner(`no one! It's a tie!!!! :(`)
      }
    }
    //set the state of the turn
    // TO DO: Pull this out to a function, next player
    if (currentPlayer === PLAYER_1){
      setNextPlayer(PLAYER_2);
    } else {
      setNextPlayer(PLAYER_1);
    }
  } 
  
 

  const checkForWinner = (squares) => {
    // Complete in Wave 3
    //list out all possibel winningLines
    const winningLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6] 
    ];
    const squareArray = squares.flat();
  
    for(let i = 0; i < winningLines.length; i ++) {
      //destruction
      const [a,b,c] = winningLines[i]
      if (squareArray[a].value && squareArray[a].value === squareArray[b].value  && squareArray[b].value ===squareArray[c].value) {
        return squareArray[a].value
      } 
    }
     // if loop thru the whole possible winning list, but no one wins - return null
    return null;
    //console.log(`checking square = ${squares.flat()[0].value}`);
  }

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setOccupySquare(1);
    setNextPlayer(PLAYER_1);
    setWinner(null);
  }


  // TO DO: Put this into next player function
  // to print out the next player or winner player
  let status 
  if (currentWinner === null) {
    status = `Next Player is ${currentPlayer}`
  } else {
    status = `The winner is ${currentWinner}`
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{status}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateSquare} />
      </main>
    </div>
  );
}

export default App;
