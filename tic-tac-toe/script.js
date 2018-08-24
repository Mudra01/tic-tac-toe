var msg = document.querySelector('.message');
var chooser = document.querySelector('form');
var mark;
var cells;
boxes = [];
var move = 0;


// add click listener to radio buttons
function setPlayer() {
  mark = this.value;
 msg.textContent = mark + ', click on a square to make your move!';
  chooser.classList.add('game-on');
  
  buildGrid();
}

// add click listener to each cell
function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    

   var x = checkRow();
   if(x==true){
      alert(mark + " Won!!");
      move = 0;
      resetGrid();
   }
   else if(move==4){
    alert("draw!!");
    move = 0;
    resetGrid();
   }
   else{
    switchMark();
    computerMove();
  }
  }
}

// let the computer make the next move
function computerMove() {
  var emptyCells = [];
  var random;
  /*if(move==9){
    msg.textContent = 'Draw';
    return true;
  }
  */
  move = move +1;

/*  for (var i = 0; i < cells.length; i++) {
    if (cells[i].textContent == '') {
      emptyCells.push(cells[i]);
    }
  }*/
  
  cells.forEach(function(cell){
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });
  
  // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  var x = checkRow();
  if(x==true){
          alert(mark + " Won!!");
          move = 0;
    resetGrid();
  }
  switchMark();
}

// switch player mark
function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}

// determine a winner
function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
  //  msg.textContent = mark + ' is the winner!';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    return true;
  } else {
    return false;
  }
}

// check cell combinations 
function checkRow() {
  return winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'))
  || winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'))
   || winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'))
   || winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'))
  || winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'))
  || winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'))
 || winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'))
  || winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

// clear the grid
function resetGrid() {
    move = 0;
 /* for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('winner');
  }*/
  cells.forEach(function(cell){
    cell.textContent = '';
    cell.classList.remove('winner');
  });

  msg.textContent =  mark + ', click on a square to make your move!';


  chooser.classList.remove('game-on');
  boxes.innerHTML = '';
  
}

// build the grid
function buildGrid() {

  /*for (var i = 1; i <= 9; i++) {
    var cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
*/

    var board = document.createElement('table');
    board.setAttribute('border', 0);
    board.setAttribute('cellspacing', 0);

    var identifier = 1;
    for (var i = 0; i < 3; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < 3; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.id = 'c' + identifier; 
      cell.addEventListener('click', playerMove,false);
      row.appendChild(cell);
      boxes.push(cell);
      identifier = identifier+1;

      document.getElementById('tictactoe').appendChild(board);
  }
}

  /* cells = document.querySelectorAll('li'); //Returns a NodeList, not an Array
  See https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches */
 cells = Array.prototype.slice.call(board.getElementsByTagName('td'));
}



var players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
  choice.addEventListener('click', setPlayer, false);
});

var resetButton = chooser.querySelector('button');
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetGrid();
});
var changeButton = chooser.querySelector("#change_mark");
changeButton.addEventListener('click', function(e){
  e.preventDefault();
  switchMark();
  resetGrid();
});