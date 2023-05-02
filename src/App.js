import './App.css';
import React from 'react';
import { useState } from 'react';


function Tile ({value, tileClick}) {
  return (<button class='rounded-3 shadow' onClick={tileClick} classname='tile'>{value}</button>);
}

function Box({xStatus, tiles, onPlay}) {
  //  const [tiles, setTiles] = useState(Array(9).fill(null));
  //  const [xStatus, setxStatus] = useState(true);
   
   function click (i) {
    if (tiles[i] || Winner(tiles)) {
      return;
    } 
    const nextTiles = tiles.slice();
    if (xStatus) {
      nextTiles[i] = "X";
   } else {
      nextTiles[i] = 'O';
    }
     onPlay(nextTiles);
  }

  const gameWinner = Winner(tiles);
 


  function Turn () {
    if(gameWinner) {
      return <h2>Winner: {gameWinner}</h2>;
    }else if (xStatus) {
      return <h2>X's Turn</h2>
    } else {
      return <h2>O's Turn</h2>
    }
  }

  return <>
    <div id='card' class='card shadow p-3 text-center'>
    <h1>TIC TAC TOE</h1>
    <div className='board-row'>
    <Tile tileClick={() => click(0)} value={tiles[0]} />
    <Tile tileClick={() => click(1)} value={tiles[1]}/>
    <Tile tileClick={() => click(2)} value={tiles[2]}/>
    </div>
    <div className='board-row'>
    <Tile tileClick={() => click(3)} value={tiles[3]}/>
    <Tile tileClick={() => click(4)} value={tiles[4]}/>
    <Tile tileClick={() => click(5)} value={tiles[5]}/>
    </div>
    <div className='board-row'>
    <Tile tileClick={() => click(6)} value={tiles[6]}/>
    <Tile tileClick={() => click(7)} value={tiles[7]}/>
    <Tile tileClick={() => click(8)} value={tiles[8]}/>
    </div>
    </div>
    <div id='text' class='text-center p-3'><Turn/></div>
    </>
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xStatus = currentMove % 2 === 0;
  const currentTiles = history[currentMove];

  function handlePlay(nextTiles) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextTiles];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((tiles, move) => {
    let description;
    if (move > 0) {
      description = 'Turn ' + move;
    } else {
      description = 'Start of Game';
    }
    return (
      <li key={move}>
        <button class='rounded-3' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Box xStatus={xStatus} tiles={currentTiles} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

function Winner (tiles) {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
}

