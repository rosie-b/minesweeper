document.addEventListener('DOMContentLoaded', startGame)

// Defined `board` objects:
var board = {cells: []} 
var boardSize = 3 
createBoardCells()  
setMine() 

// Function to generate the board and cell properties:
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

// Function to set mines (randomly assigns):
// TO DO: Dictate number of mines to be set (currently, could be in one cell or even all cells... not ideal...).
// TO DO: Allow player to set the number of mines, to increase/decrease difficulty level.
function setMine() {
  if ((isMine = Math.floor(Math.random() *2)) === 0) {
      isMine = false;
  } else {
      isMine = true;
  } return isMine;
}

// Function to start the game and initiate the board.
// Don't remove this function call: it makes the game work!
function startGame () {
  document.addEventListener('contextmenu', checkForWin);
  document.addEventListener('click', checkForWin);
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  };
  lib.initBoard()
}

document.addEventListener('click', checkForLose);  // To check for mines when cell clicked on.
document.addEventListener('click', leftClick);  // When left click, call function to make "tick" sound.
document.addEventListener('contextmenu', rightClick)  // When right click, call function to make "click" sound.

// Variables to define the win/lose/click/flag sounds.
var soundApplause = new Audio("sounds/Applause.mp3");  // If win
var soundExplosion = new Audio("sounds/Explosion.mp3"); // If reveal a mine
var soundTick = new Audio("sounds/Tick.mp3"); // When click on cell
var soundClick = new Audio("sounds/Click.mp3");  // When flag a cell 

// Function to define win condition and (if win), produce message and "applause" sound.
function checkForWin () {
  for (var b = 0; b <board.cells.length; b++) {  // For loop to check through all the cells on the board.
    if (board.cells[b].isMine) {
      if (board.cells[b].isMarked === false)
      return; // If cell has a mine and is NOT marked, then return out of the loop.
    } else if (board.cells[b].hidden)
    return; // If cell is still hidden, then return out of the loop.
  }
  // If all the mines have been flagged and all the other cells have been unhidden, then game over.  
  lib.displayMessage('You win!');
  soundApplause.play();
}  

// Function to play sound when reveal cell.
function leftClick () {
  soundTick.play();
}

// Function to play sound when reveal cell.
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

// function to start a new game (refreshes the page and so re-initialises the board).
function restart() {
  document.location.href ="";
}

// Function to count the number of mines around the cell.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  
  for (var a = 0; a < surrounding.length; a++) {
    if(surrounding[a].isMine) 
    count ++;
  } return count;
};

// TO DO: Add a mine count to show the total number of mines remaining on the board at any one time.

