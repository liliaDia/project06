

  //every time a player moves you have to check if they won
  //ways to win 2 diagonals 3horizontal and 3 vertical
  //when you use queryselector all it makes it into an array
  //detirmine if game is over, if game is tie and game won
  let cell = Array.from(document.querySelectorAll('.cell'))
  let board= document.getElementById("board")
  let currentPlayer = "X"
  let playerX= "X"
  let playerO= "O"
  let gameMessage =  document.getElementById("gameMessage")
  let startBtn= document.getElementById('startButton')
 let player1input = document.getElementById("player1")
let player2input = document.getElementById("player2")


function checkwinner(){
 if (currentPlayer)
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [1,4,8],
  [2,4,6]
}

board.addEventListener("click", function(event){
  console.log(event.target)
  event.target.innerText= currentPlayer
    if (currentPlayer=playerX){
    currentPlayer= playerO
  }
})

startBtn.addEventListener("click", hide)

function hide(){
  document.querySelector("#player1Text").className="hide"
  document.querySelector("#player2Text").className="hide"
  startBtn.className="hide"
  gameMessage.innerText= `${player1input.value} VS. ${player2input.value}`

}