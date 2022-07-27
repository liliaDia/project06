function createNewGame(player1, player2) {
  return {
    gameOver: false,
    player1: player1, //player x
    player2: player2, //player o
    currentPlayer: player1,
    playerPositionRow: null,
    playerPositionCol: null,
    tie: false,

    updateBoard: function () {
      if (
        this.gameBoard[this.playerPositionRow][this.playerPositionCol] === null 
      ) {
        this.gameBoard[this.playerPositionRow][this.playerPositionCol] =
          this.currentPlayer;

      } else {
        return "please pick another spot";
      }
      this.checkWinner([this.playerPositionRow][this.playerPositionCol]);
    },
    gameBoard: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],

    checkWinner: function () {
      for (let i = 0; i < 3; i++) {
        if (
          this.gameBoard[i][0] === this.currentPlayer &&
          this.gameBoard[i][1] === this.currentPlayer &&
          this.gameBoard[i][2] === this.currentPlayer
        ) {
          return this.gameOver = true;
        }
        for (let j = 0; j < 3; j++) {
          if (
            this.gameBoard[0][j] === this.currentPlayer &&
            this.gameBoard[1][j] === this.currentPlayer &&
            this.gameBoard[2][j] === this.currentPlayer
          ) {
            return this.gameOver = true;
          }
        }
        if (
          this.gameBoard[0][0] === this.currentPlayer &&
          this.gameBoard[1][1] === this.currentPlayer &&
          this.gameBoard[2][2] === this.currentPlayer
        ) {
          return this.gameOver = true;
        }
        if (
          this.gameBoard[0][2] === this.currentPlayer &&
          this.gameBoard[1][1] === this.currentPlayer &&
          this.gameBoard[2][0] === this.currentPlayer
        ) {
          return this.gameOver = true;
        }
      }
      this.checkDraw(this.gameBoard)
      
    },

    checkDraw: function(){
      for (i=0; i<3; i++){
        for (let j=0;j<3; j++){
          if (!this.gameBoard [i][j]===null){
            this.tie = true
          }
        }
      }
      this.changePlayer()
      },

    changePlayer: function () {
      if (this.currentPlayer === player1) {
        this.currentPlayer = player2;
        return `${player2}'s turn`
      } else {
        this.currentPlayer = player1;
        return `${player1}'s turn`
      }
    },
  };
}

//every time a player moves you have to check if they won
//ways to win 2 diagonals 3horizontal and 3 vertical
//when you use queryselector all it makes it into an array
//detirmine if game is over, if game is tie and game won*/
//set player
//set current player

let cell = document.querySelectorAll(".cell");
let board = document.getElementById("board");
let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let gameMessage = document.getElementById("gameMessage");
let startBtn = document.getElementById("startButton");
let resetBtn = document.getElementById("resetButton");
let player1input = document.getElementById("player1");
let player2input = document.getElementById("player2");
let player1Name = document.querySelector("#player1Text");
let player2Name = document.querySelector("#player2Text");

let game = createNewGame(playerX, playerO);

startBtn.addEventListener("click", hide);

function hide() {
  player1Name.className = "hide";
  player2Name.className = "hide";

  startBtn.className = "hide";
  gameMessage.innerText = `${player1input.value} VS. ${player2input.value}`;
}
startBtn.addEventListener("click", function(){
  board.classList.remove("hide")
});


board.addEventListener("click", function (event) {
  event.target.innerText = game.currentPlayer;
  let playerRow = event.target.id[0];
  let playerCol = event.target.id[1];
  game.playerPositionRow = playerRow;
  game.playerPositionCol = playerCol;

  game.updateBoard();
  if (game.gameOver) {
    gameMessage.innerText= `winner is ${game.currentPlayer}`
    resetBtn.classList.remove("hide")
    cell.disabled = true
    board.disabled = true
    
    //console.log(`winner is ${game.currentPlayer}`);
  }

  if (game.tie){
    gameMessage.innerText="draw"
    reset.classList.remove("hide")
  }
});

resetBtn.addEventListener("click", function(){
  for(let i = 0; i<cell.length; i++){
  cell[i].innerHTML= ''
  }

  game = createNewGame(playerX, playerO);
})

