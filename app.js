function createNewGame(player1, player2) {
  return {
    gameOver: false,
    player1: player1, 
    player2: player2, 
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
          } 
      else {
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
      console.log(this.gameBoard)
      for (let i = 0; i < 3; i++){
          if (this.gameBoard[i].includes(null)){
            return this.changePlayer()  
          }
        }
        this.tie = true
      },

    changePlayer: function () {
      if (this.currentPlayer === player1) {
        this.currentPlayer = player2;
       return currentTurn.innerText = `${player2input.value}'s turn`
      } else {
        this.currentPlayer = player1;
        return currentTurn.innerText= `${player1input.value}'s turn`
      }

    },
  };
}


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
let currentTurn = document.getElementById("currentTurn");
if ()

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
  randomPlayer();
});


board.addEventListener("click", function (event) {
 if (event.target.innerText === ''){
  event.target.innerText = game.currentPlayer;
 }

 if (currentTurn.innerText === `${player1input.value}'s turn`){
  currentTurn.innerText = `${player2input.value}'s turn`
 }
 else{currentTurn.innerText= `${player1input.value}'s turn`}

 if (game.gameOver){
  event.target.innerText = ""
 }
  let playerRow = event.target.id[0];
  let playerCol = event.target.id[1];
  game.playerPositionRow = playerRow;
  game.playerPositionCol = playerCol;
  
  game.updateBoard();
  
  //console.log(game.gameBoard)
  if (game.gameOver) {
    gameMessage.innerText= `winner is ${game.currentPlayer}`
    resetBtn.classList.remove("hide")
    board.disabled = true
    currentTurn.innerText=""

  }
  console.log(game.tie)

  if (game.tie){
    gameMessage.innerText= "draw"
    resetBtn.classList.remove("hide")
    currentTurn.innerText=""
  }
});

resetBtn.addEventListener("click", function(){
  for(let i = 0; i<cell.length; i++){
  cell[i].innerHTML= ''
  }
  gameMessage.innerText= ""
  currentTurn.innerText = ""
  startBtn.classList.remove("hide")
  player1input.value = ""
  player2input.value = ""
  player1Name.classList.remove("hide");
  player2Name.classList.remove("hide");
  board.classList.add("hide")


  game = createNewGame(playerX, playerO);
})


function randomPlayer(){
  let randomNum = Math.floor(Math.random() * 2)+1 ;
  if (randomNum===1){
    currentTurn.innerText= `${player1input.value}'s turn`
  }

  if (randomNum===2){
    currentTurn.innerText= `${player2input.value}'s turn`
  }
  
}



