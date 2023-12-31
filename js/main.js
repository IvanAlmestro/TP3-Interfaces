
let btnMenu = document.querySelector(".menu-btn");
btnMenu.addEventListener("click", function () {
  let menuBuger = document.querySelector("#nav-containers");
  menuBuger.classList.toggle("nav-container");
});

var rotado = false;
btnMenu.addEventListener("click", function () {
  let logoMenu = document.querySelector(".menu-btn");
  if (rotado) {

    logoMenu.style.transform = "rotate(0deg)";
  } else {
    logoMenu.style.transform = "rotate(90deg)";
  }

  rotado = !rotado;
})

let btnUser = document.querySelector(".user-btn");
btnUser.addEventListener("click", function () {
  let menuUser = document.querySelector("#user-containers");
  menuUser.classList.toggle("user-container");

});



var i = 0;
function move() {
  if (window.location.href.includes("index.html")) {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 10;
      var id = setInterval(frame, 50);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
}

move();



document.addEventListener("DOMContentLoaded", function () {
  // Encuentra el div por su id

  let load = document.getElementById("load-container");
  if (window.location.href.includes("index.html")) {
    // Establece un temporizador para ocultar el div después de 5 segundos (5000 milisegundos)
    setTimeout(function () {
      load.style.display = "none"; // Oculta el div
    }, 5000); // 5000 milisegundos (5 segundos)
  }

});

const botonCompartir = document.getElementById("btn-share");
const popup = document.getElementById("popup");
const cerrarPopup = document.getElementById("cerrarPopup");

if (window.location.href.includes("game.html")) {
  botonCompartir.addEventListener("click", function () {
    popup.style.display = "flex"; // Muestra el popup al hacer clic en el botón
  });

  cerrarPopup.addEventListener("click", function () {
    popup.style.display = "none"; // Oculta el popup al hacer clic en el botón "Cerrar"
  });
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = 110; // Altura de tu encabezado (ajusta según sea necesario)
      const offsetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Desplazamiento suave
      });
    }
  });
});


//CODIGO PARA 4 en linea

document.getElementById("btn-play").addEventListener("click", function () {

  // Oculta el formulario
  document.getElementById("miFormulario").style.display = "none";

  // Muestra el contenido adicional
  document.getElementById("turn").style.display = "block";

  document.getElementById("canvas").style.display = "block";
  document.getElementById("instruction").style.display = "flex";
  document.getElementById("img-share").style.display = "block";
  document.getElementById("container-clubs").style.marginBottom = "8px";

});

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

turn = document.getElementById('turn');

const tipoJuego = document.getElementById('opciones');
const play = document.getElementById('btn-play');
const formulario = document.getElementById('miFormulario');
const playAgainButton = document.getElementById("play-again");

const imgClub1Select = document.getElementById('img-club1');
const imgClub2Select = document.getElementById('img-club2');
const selectClub1 = document.getElementById('club1');
const selectClub2 = document.getElementById('club2');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let players = [];
let figures = [];
let disksA = [];
let disksB = [];

//creo mi Game, board,players y diks tomando lo que me pase el user desde el DOM
let board = new Board(6, 7, 90, 485, 50);//tablero por default
let CANT_FIG = board.getSize();
let player1 = new Player("azul", disksA);
let player2 = new Player("rojo", disksB);
players.push(player1, player2);

let game = new Game(players, board, figures, 4);

let lastClickedFigure = null;
let isMouseDown = false;

function createGame() {//crea el juego dependiendo de los parametros elegidos por el usuario
  let cellSize = 70;
  let valor = tipoJuego.value;
  let rows = parseInt(valor) + 2;
  let cols = parseInt(valor) + 3;
  let boardWidth = cols * cellSize;
  let boardHeight = rows * cellSize;
  let startX = (canvasWidth - boardWidth) / 2;
  let startY = 0;
  board = new Board(rows, cols, cellSize, startX, startY);
  game = new Game(players, board, figures, parseInt(valor));
  addFigures();
  board.draw(ctx);
  CANT_FIG = board.getSize();
  game.startTimer();
  //update();
}
selectClub1.addEventListener('change', function () {//se fija que club eligio el usuario
  var selectedClub = document.getElementById('club1').value;
  var imagePath = 'images/4enlinea/' + selectedClub + '.png';
  imgClub1Select.src = imagePath;
});

selectClub2.addEventListener('change', function () {//se fija que club eligio el usuario
  var selectedClub2 = document.getElementById('club2').value;
  var imagePath = 'images/4enlinea/' + selectedClub2 + '.png';
  imgClub2Select.src = imagePath;
});

formulario.addEventListener('submit', function (event) {//asigno los clubes que eligio el jugador
  event.preventDefault();

  club1 = document.getElementById('club1').value;
  club2 = document.getElementById('club2').value;

  player1.setName(club1);
  player2.setName(club2);

  imgClub1 = new Image();
  imgClub2 = new Image();

  createGame();
});

let currentColor = 'blue';
function addFigure() {//agrego las figuras de los 2 equipos
  if (currentColor === 'blue') {
    addCircle('blue');
    currentColor = 'red';
  } else {
    addCircle('red');
    currentColor = 'blue';
  }
  update();
}

function update(c) {//actualizo el canvas
  // Limpia el canvas
  clearCanvas();
  board.draw(ctx, c);
  let player = game.getCurrentPlayer();
  turn.textContent = 'Es el turno de:    ' + player.getName();

  for (let i = 0; i < figures.length; i++) {
    figures[i].draw();
  }
}

function getRandomNumber(min, max) {//genera un numero random
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addCircle(team) {//agrego el circle dependiendo el equipo
  let circleRadius = 30;
  let posX, posY;
  let boardYmax = canvasHeight - board.getStartY() - circleRadius - 50;
  let boardYmin = canvasHeight - board.getHeight() + board.getStartY() + 10;
  let numRandom = getRandomNumber(boardYmax, boardYmin);
  if (team === 'blue') {
    var club = club1;
    posX = Math.round(Math.random() * (board.getStartX() - circleRadius - circleRadius) + circleRadius - 5);//que aparezca en los containers
    posY = canvasHeight - circleRadius - numRandom;
    let circle = new Circle(posX, posY, circleRadius, team, ctx, club1);
    disksA.push(circle);
  } else if (team === 'red') {
    var club = club2;
    const maxX = (canvasWidth - circleRadius) - board.getStartX() - board.getWidth() - circleRadius;
    posX = Math.round(Math.random() * maxX + board.getStartX() + board.getWidth() + circleRadius + 5);//que aparezca en los containers
    posY = canvasHeight - circleRadius - numRandom;
    let circle = new Circle(posX, posY, circleRadius, team, ctx, club2);
    disksB.push(circle);
  }

  let circle = new Circle(posX, posY, circleRadius, team, ctx, club);
  figures.push(circle);
}

function onMouseDown(e) {//si hay una figura en el mouse la selecciona
  isMouseDown = true;

  if (lastClickedFigure != null && !lastClickedFigure.getMovido()) {
    lastClickedFigure.setResaltado(false);
    lastClickedFigure = null;
  }
  let player = game.getCurrentPlayer();
  let clickFig = findClickedFigure(e.offsetX, e.offsetY);
  if (clickFig != null && player.disksContains(clickFig)) {
    clickFig.setResaltado(true);
    lastClickedFigure = clickFig;
  }
  update();
}

function onMouseUp(e) {//si hay una ficha en una columna y la suelta la dropea ahi
  isMouseDown = false;
  disk = lastClickedFigure;
  if (disk != null) {
    var col = board.getCol(disk);
  }


  if (disk != null && col != null) {//si hay un disk seleccionado y una columna lo dropeo
    if (!board.isColumnFull(col)) {
      let player = game.getCurrentPlayer();
      player.dropDisk(col, disk, board, game);
      game.winGame();
    } else {//si la columna esta llena lo devuelvo a la pos original
      disk.posOriginal();
    }
  } if (disk != null && col === null) {//si no lo dropea en nunguna columna lo devuelvo a la pos original
    disk.posOriginal();
  }
  update();

}

function onMouseMove(e) {//si hay una figura la va moviendo
  if (isMouseDown && lastClickedFigure != null) {
    lastClickedFigure.setPosition(e.offsetX, e.offsetY);
    let col = board.getCol(lastClickedFigure);
    update(col);//si hay una figura en una columna, resalta esa columna
  }
}

function clearCanvas() {//borra el canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


function addFigures() {//agrega las figuras dependiendo de la cantidad que son
  addFigure();
  if (figures.length < CANT_FIG) {
    setTimeout(addFigures, 33);
  }
}

playAgainButton.addEventListener('click', function () {//el boton para jugar de vuelta
  resetGame();
  document.getElementById("canvas").style.display = "none";
  document.getElementById("turn").style.display = "none";
  document.getElementById("winner").style.display = "none";
  document.getElementById("timer").style.display = "none";
});


function resetGame() {//restablece los valores iniciales del juego
  players = [];
  figures = [];
  disksA = [];
  disksB = [];

  board = new Board(6, 7, 90, 485, 50); //tablero por defecto
  CANT_FIG = board.getSize();
  board.draw(ctx);

  player1 = new Player("azul", disksA);
  player2 = new Player("rojo", disksB);
  players.push(player1, player2);

  game = new Game(players, board, figures, 4);

  lastClickedFigure = null;
  isMouseDown = false;
  currentColor = 'blue';

  //limpia el canvas
  clearCanvas();
  update();

  //oculta el botón "Jugar de Nuevo"
  playAgainButton.style.display = "none";
  document.getElementById("turn").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("miFormulario").style.display = "block";


}

playAgainButton.addEventListener('click', resetGame);

function showWinner(empate) {//muestra el ganador o un empate
  let player = game.getCurrentPlayer().getName();
  let winner = document.getElementById("winner");
  if (empate === true) {
    winner.innerHTML = "EMPATE";
  } else {
    winner.innerHTML = "Ganó: " + player;
  }
  playAgainButton.style.display = "block";
  document.getElementById("winner").style.display = "block";
  document.getElementById("timer").style.display = "none";
  document.getElementById("turn").style.display = "none";
  document.getElementById("container-clubs").style.marginBottom = "75px";

}

function findClickedFigure(x, y) {//se fija si hay una figura en el mouse
  for (let i = 0; i < figures.length; i++) {
    const element = figures[i];
    if (element.isPointInside(x, y)) {
      return element;
    }
  }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

