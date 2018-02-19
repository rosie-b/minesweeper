document.addEventListener('DOMContentLoaded', startGame)


// Define your `board` object here!
var board = {cells: []}  //sets the board variable, with cell properties TBC when createBoardCells function is generated
var boardSize = 3 //sets board size to 3x3, to be referenced in for loop
createBoardCells()  //calls the createBoardCells function
setMine() // calls function to randomly generate mines

//function to generate the board size
function createBoardCells() {
  for (var x = 0; x < boardSize; x++) {
    for (var y = 0; y < boardSize; y++) {
      board.cells.push({
      row: x,
      col: y,
      isMine: setMine(),
      isMarked: false,
      hidden: true
      })
    }  
  }
}

//function to set mines
function setMine() {
  if ((isMine = Math.floor(Math.random() *2)) === 0) {
      isMine = false;
  } else {
      isMine = true;
  }
  return isMine;
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  document.addEventListener('contextmenu', checkForWin);
  document.addEventListener('click', checkForWin);
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };
  lib.initBoard()
}

// Event listener to check for mines when cell clicked on.
document.addEventListener('click', checkForLose);
document.addEventListener('click', leftClick);
document.addEventListener('contextmenu', rightClick)
// Variables to define the win/lose sounds.
var soundApplause = new Audio("sounds/Applause.mp3");
var soundExplosion = new Audio("sounds/Explosion.mp3");
var soundTick = new Audio("sounds/Tick.mp3");
var soundClick = new Audio("sounds/Click.mp3");

// Define this function to look for a win condition:
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // for loop to check through all the cells on the board
  for (var b = 0; b <board.cells.length; b++) {
    // if cell has a mine and is NOT marked, then return out of the loop.
    if (board.cells[b].isMine) {
      if (board.cells[b].isMarked === false)
      return;
    } 
    // if cell is still hidden, then return out of the loop.
    else if (board.cells[b].hidden)
    return;
    }

  // if all the mines have been flagged and all the other cells have been unhidden, then game over.  
  lib.displayMessage('You win!');
  soundApplause.play();
}  

function leftClick () {
  soundTick.play();
}

function rightClick () {
  soundClick.play();
}

// Function to check if a mine has been revealed and play 'explosion' sound if so.
function checkForLose () {
  for (var b = 0; b <board.cells.length; b++) {
    if (board.cells[b].isMine) {
      if (board.cells[b].hidden === false)
      return soundExplosion.play(); 
    }
  }
}


// function to start a new game (refreshes the page and so reinitialises the board)
function restart() {
  document.location.href ="";

}

// You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //lib.displayMessage('You win!')
  //}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  
  for (var a = 0; a < surrounding.length; a++) {
    if(surrounding[a].isMine) 
      count ++;
    } return count;
  };

  // code line1: sets function name and parameter, opens function {
  // code line2: sets the surrounding cells variable name and value per the instructions
  // code line3: sets the variable name count
  // code line4: sets the for loop in action, looping through the surrounding variable. Opens the for loop if statement {
  // code line5: checks if the surrounding cells contain mines...
  // code line6: ... if surrounding cells contain mines, count the total
  // code line7: closes the for loop if statement }. return the value of the count. 
  // code line8: closes function }


