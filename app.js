let game = {
  winner:false,

  playerPosition: null,
  
  gameBoard: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],

  checkWinner: function(){
    for (let i = 0;i < 3; i++){
if (this.gameBoard[i][0]&&this.gameBoard[i][1]&&this.gameBoard[i][2]){
  this.winner= true
  }
    }
  for (let i = 0;i < 3; i++){
  if (this.gameBoard[0][i]&&this.gameBoard[1][i]&&this.gameBoard[2][i]){
    this.winner= true
  }
    }
  
  },
  updateBoard: function () {
  this.gameBoard[this.playerPosition]= currentPlayer
  },

  changePlayer: function (){
    if (currentPlayer= playerX){
      currentPlayer= playerO
    }
    else (currentPlayer=playerX)
  }



};

//every time a player moves you have to check if they won
//ways to win 2 diagonals 3horizontal and 3 vertical
//when you use queryselector all it makes it into an array
//detirmine if game is over, if game is tie and game won*/

let cell = document.querySelectorAll(".cell");
let board = document.getElementById("board");
let playerX = "X";
let playerO = "O";
let currentPlayer = playerX;
let gameMessage = document.getElementById("gameMessage");
let startBtn = document.getElementById("startButton");
let player1input = document.getElementById("player1");
let player2input = document.getElementById("player2");
let playerposition = [[], []];

board.addEventListener("click", function (event) {
  let position = event.target.id;
  playerposition[0].push(position[0]);
  playerposition[1].push(position[1]);
  game.playerPosition = playerposition;
  console.log(playerposition);
  playerposition = [[], []];
});

startBtn.addEventListener("click", hide);

function hide() {
  document.querySelector("#player1Text").className = "hide";
  document.querySelector("#player2Text").className = "hide";
  startBtn.className = "hide";
  gameMessage.innerText = `${player1input.value} VS. ${player2input.value}`;
}
