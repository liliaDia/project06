

  //every time a player moves you have to check if they won
  //ways to win 2 diagonals 3horizontal and 3 vertical
  //when you use queryselector all it makes it into an array
  let cell = document.querySelectorAll('.cell')
  let board= document.getElementById("board")
let currentPlayer = X
  board.addEventListener("click", function(''){
    for (let i=0; i<cell.length; i++)
    cell[i].innerText = currentPlayer
  })


