class Connect4 {
  constructor() {
    this.canvas = document.getElementById('connect4');
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = 60;
    this.rows = 6;
    this.columns = 7;
    this.playerColors = ['#FF0000', '#FFFF00']; // Red and Yellow
    this.board = Array.from({ length: this.columns }, () => Array(this.rows).fill(0));
    this.currentPlayer = 0; // 0 for Red, 1 for Yellow
    this.draggingColumn = -1;
    this.draggedCircle = null;

    // Add a new canvas for the circles outside of the main canvas
    this.circlesCanvas = document.createElement('canvas');
    this.circlesCanvas.width = this.canvas.width;
    this.circlesCanvas.height = this.canvas.height;
    this.circlesCtx = this.circlesCanvas.getContext('2d');
    document.getElementById('game-container').appendChild(this.circlesCanvas);

    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('click', this.handleDropPiece.bind(this));

    // Listen for drag and drop events on the circles canvas
    this.circlesCanvas.addEventListener('mousedown', this.handleCircleMouseDown.bind(this));
    this.circlesCanvas.addEventListener('mousemove', this.handleCircleDrag.bind(this));
    this.circlesCanvas.addEventListener('mouseup', this.handleCircleMouseUp.bind(this));

    this.drawBoard();
    this.drawCircles();
  }

  drawBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        this.ctx.fillStyle = this.board[col][row] === 0 ? '#FFFFFF' : this.playerColors[this.board[col][row] - 1];
        this.ctx.beginPath();
        this.ctx.arc(col * this.cellSize + this.cellSize / 2, row * this.cellSize + this.cellSize / 2, this.cellSize / 2 - 5, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
  }

  handleMouseMove(e) {
    const col = Math.floor(e.offsetX / this.cellSize);
    this.drawBoard();
    this.ctx.fillStyle = this.playerColors[this.currentPlayer];
    this.ctx.beginPath();
    this.ctx.arc(col * this.cellSize + this.cellSize / 2, 15, this.cellSize / 2 - 5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.draggingColumn = col;
  }

  handleCircleMouseDown(e) {
    for (let col = 0; col < this.columns; col++) {
      if (Math.pow(e.offsetX - (col * this.cellSize + this.cellSize / 2), 2) + Math.pow(e.offsetY - 15, 2) <= Math.pow(this.cellSize / 2 - 5, 2)) {
        this.draggedColumn = col;
        return;
      }
    }
  }

  handleCircleDrag(e) {
    if (this.draggedColumn !== -1) {
      this.circlesCtx.clearRect(0, 0, this.circlesCanvas.width, this.circlesCanvas.height);
      this.circlesCtx.fillStyle = this.playerColors[this.currentPlayer];
      this.circlesCtx.beginPath();
      this.circlesCtx.arc(e.offsetX, 15, this.cellSize / 2 - 5, 0, 2 * Math.PI);
      this.circlesCtx.fill();
    }
  }

  handleCircleMouseUp() {
    if (this.draggedColumn !== -1) {
      this.circlesCtx.clearRect(0, 0, this.circlesCanvas.width, this.circlesCanvas.height);
      this.board[this.draggedColumn][0] = this.currentPlayer + 1;
      this.drawBoard();
      this.currentPlayer = 1 - this.currentPlayer;
      this.draggedColumn = -1;
    }
  }

  handleDropPiece() {
    if (this.draggingColumn >= 0) {
      for (let row = this.rows - 1; row >= 0; row--) {
        if (this.board[this.draggingColumn][row] === 0) {
          this.board[this.draggingColumn][row] = this.currentPlayer + 1;
          this.drawBoard();
          this.currentPlayer = 1 - this.currentPlayer;
          this.draggingColumn = -1;
          return;
        }
      }
    }
  }

  drawCircles() {
    for (let col = 0; col < this.columns; col++) {
      this.circlesCtx.fillStyle = this.playerColors[this.currentPlayer];
      this.circlesCtx.beginPath();
      this.circlesCtx.arc(col * this.cellSize + this.cellSize / 2, 15, this.cellSize / 2 - 5, 0, 2 * Math.PI);
      this.circlesCtx.fill();
    }
  }
}

const game = new Connect4();
