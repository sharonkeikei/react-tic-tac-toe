import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  let allSquare = [];
  squares.map((squareRow) => {
    squareRow.map((eachSquare) => {
      allSquare.push (
        <Square
        value={eachSquare.value}
        id={eachSquare.id}
        onClickCallback={onClickCallback}
        key={eachSquare.id}
        />
        )
      })
    })
    //console.log(allSquare);
    return (allSquare)
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  //console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
