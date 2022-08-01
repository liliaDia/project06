function createNewGame(player1, player2) {
 
  return {
    gameOver: false,
    player1:player1,
    player2: player2,
    computer: false,
    player:{
      currentPlayer: player1,
      playerName: null
    },
    playerPositionRow: null,
    playerPositionCol: null,
    tie: false,
    name1:null,
    name2:null,

    random: function(){
      let randomNum = Math.floor(Math.random() * 2) + 1;
      if (randomNum === 1) {
      this.player.currentPlayer= player1;
      }
      else{
        this.player.currentPlayer= player2;
      }
    },

    updateBoard: function () {

      if (
        this.gameBoard[this.playerPositionRow][this.playerPositionCol] === null
      ) {
        this.gameBoard[this.playerPositionRow][this.playerPositionCol] =
          this.player.currentPlayer;
      } 
      this.updateUIGameboard();
      this.checkWinner([this.playerPositionRow][this.playerPositionCol]);
    },

    updateUIGameboard: function(){

      let cellId = `${this.playerPositionRow}${this.playerPositionCol}`
      if (document.getElementById(cellId).innerHTML===''){
        document.getElementById(cellId).innerHTML=this.player.currentPlayer;
      }
    },

    gameBoard: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],

    checkWinner: function () {
      for (let i = 0; i < 3; i++) {
        if (
          this.gameBoard[i][0] === this.player.currentPlayer &&
          this.gameBoard[i][1] === this.player.currentPlayer &&
          this.gameBoard[i][2] === this.player.currentPlayer
        ) {
          return (this.gameOver = true);
        }
        for (let j = 0; j < 3; j++) {
          if (
            this.gameBoard[0][j] === this.player.currentPlayer &&
            this.gameBoard[1][j] === this.player.currentPlayer &&
            this.gameBoard[2][j] === this.player.currentPlayer
          ) {
            return (this.gameOver = true);
          }
        }
        if (
          this.gameBoard[0][0] === this.player.currentPlayer &&
          this.gameBoard[1][1] === this.player.currentPlayer &&
          this.gameBoard[2][2] === this.player.currentPlayer
        ) {
          return (this.gameOver = true);
        }
        if (
          this.gameBoard[0][2] === this.player.currentPlayer &&
          this.gameBoard[1][1] === this.player.currentPlayer &&
          this.gameBoard[2][0] === this.player.currentPlayer
        ) {
          return (this.gameOver = true);
        }
      }
      this.checkDraw(this.gameBoard);
    },

    checkDraw: function () {
      for (let i = 0; i < 3; i++) {
        if (this.gameBoard[i].includes(null)) {
          return this.changePlayer();
        }
      }
      this.gameOver = true;
      this.tie = true;
    },

    changePlayer: function () {
      if (this.player.currentPlayer === player1) {
        this.player.currentPlayer = player2;
        this.player.playerName = game.name2
        if (this.computer){
          this.generateMove();
        }
      } else {
        this.player.currentPlayer = player1;
        this.player.playerName = game.name1
      }
    },

    generateMove: function(){
      if (this.computer){
      for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){
          if (this.gameBoard[i][j]=== null){
            this.playerPositionRow= i;
            this.playerPositionCol= j;
          }
        }
      }
      game.updateBoard();
    }
    }
  };
}

const cell = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const playerX = "X";
const playerO = "O";
const gameMessage = document.getElementById("gameMessage");
const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("resetButton");
const player1input = document.getElementById("player1");
const player2input = document.getElementById("player2");
const player1Text = document.querySelector("#player1Text");
const player2Text = document.querySelector("#player2Text");
const currentTurn = document.getElementById("currentTurn");

let game = createNewGame(playerX, playerO);

function initializeGame(){
  game.random();
  if (player2input.value==='') {
    player2input.value = "computer";
    game.computer=true
     if (game.player.currentPlayer === playerO)
     {
        document.getElementById("11").innerHTML= game.player2;
        game.gameBoard[1][1]=game.player2;
        game.player.currentPlayer= game.player1;
        currentTurn.innerText= "computer Starts";
     }
     else if (game.player.currentPlayer === playerX){
      currentTurn.innerText=`${player1input.value} starts`
     }

  }
  game.name1=player1input.value;
  game.name2=player2input.value;
 
  if (game.player.currentPlayer===playerX && game.computer===false){
    currentTurn.innerText=`${player1input.value} starts`
  }
  else if (game.player.currentPlayer===playerO && game.computer===false){
    currentTurn.innerText=`${player2input.value} starts`
  }
  gameMessage.innerText = `${player1input.value} VS. ${player2input.value}`;
}


function resetGame() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
  gameMessage.innerText = "";
  currentTurn.innerText = "";
  startBtn.classList.remove("hide");
  player1input.value = "";
  player2input.value = "";
  player1Text.classList.remove("hide");
  player2Text.classList.remove("hide");
  board.classList.add("hide");

  game = createNewGame(playerX, playerO);
}

function hide() {
  player1Text.className = "hide";
  player2Text.className = "hide";
  startBtn.className = "hide";
}

startBtn.addEventListener("click", function () {
  if (player1input.value.length>0){
  hide();
  board.classList.remove("hide");
  initializeGame();
  }
  else{currentTurn.innerText="please enter your name"
  player1Text.className.remove("hide");
  player2Text.className.remove("hide");
  }

});

board.addEventListener("click", function (event) {
  if (game.gameOver) {
    return;
  }
 
  let playerRow = event.target.id[0];
  let playerCol = event.target.id[1];
  game.playerPositionRow = playerRow;
  game.playerPositionCol = playerCol;

  game.updateBoard();
 
  if (game.gameOver) {
    gameMessage.innerText = `winner is ${game.player.playerName}`;
    currentTurn.innerText= "";
   if (game.tie) {
    gameMessage.innerText = "draw";
    currentTurn.innerText = "";
    }
  }
  resetBtn.classList.remove("hide");
});

resetBtn.addEventListener("click", function () {
  resetGame();
});

