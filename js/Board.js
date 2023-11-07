class Board {
    constructor(rows, cols, cellSize, startX, startY) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.startX = startX;
        this.startY = startY;
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols).fill(null); // Inicializa la matriz con valores predeterminados
        }
    }
    
    // Dibuja la matriz en el canvas

    draw(ctx, column) {
        this.drawContainer(ctx);
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = this.startX + col * this.cellSize; // Ajusta la posición en X
                const y = this.startY + row * this.cellSize; // Ajusta la posición en Y

                if (row % 2 === 0) {
                    ctx.fillStyle = 'rgb(23, 119, 39)'; // Define el color de relleno
                    ctx.fillRect(x, y, this.cellSize, this.cellSize); // Dibuja un rectángulo en cada celda
                } else {
                    ctx.fillStyle = 'lightgreen'; // Define el color de relleno
                    ctx.fillRect(x, y, this.cellSize, this.cellSize); // Dibuja un rectángulo en cada celda
                }
            }
        }

        // Dibuja líneas horizontales y verticales para marcar el tablero teniendo en cuenta las coordenadas iniciales
        ctx.strokeStyle = 'black'; // Color de las líneas
        ctx.lineWidth = 1.5; // Ancho de las líneas

        for (let row = 0; row <= this.rows; row++) {
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY + row * this.cellSize);
            ctx.lineTo(this.startX + this.cols * this.cellSize, this.startY + row * this.cellSize);
            ctx.stroke();
        }

        for (let col = 0; col <= this.cols; col++) {
            if (column != null && (col === column ||col === column + 1) && (!this.isColumnFull(column))) {
                ctx.strokeStyle = 'yellow';
                ctx.lineWidth = 2.5;
            } else{
                ctx.strokeStyle = 'black';
            }
            ctx.beginPath();
            ctx.moveTo(this.startX + col * this.cellSize, this.startY);
            ctx.lineTo(this.startX + col * this.cellSize, this.startY + this.rows * this.cellSize);
            ctx.stroke();

        }

    }


    drawContainer(ctx) {//dibuja los containers de los discos
        const containerColor = 'rgba(0, 0, 0, 0.5)'; // Color negro transparente (ajusta la opacidad según tus preferencias)
        const borderColor = 'black'; // Color de los bordes
        const borderWidth = 2; // Grosor de los bordes
        ctx.fillStyle = containerColor;
        const containerWidth = this.startX;
    
        // Dibuja el contenedor izquierdo con bordes
        ctx.fillRect(0, 0, containerWidth - 10, this.getHeight());
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, containerWidth - 10 - borderWidth, this.getHeight() - borderWidth);
    
        const containerX = this.startX + this.getWidth() + 10;
    
        // Dibuja el contenedor derecho con bordes
        ctx.fillRect(containerX, 0, ctx.canvas.width - containerX, this.getHeight());
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(containerX + borderWidth / 2, borderWidth / 2, ctx.canvas.width - containerX - borderWidth, this.getHeight() - borderWidth);
    }
    
    


    coordCell(row, col) {//retorna las cordenada de unas celda dada
        const x = this.startX + col * this.cellSize + this.cellSize / 2;
        const y = this.startY + row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    fillCol(col, circle) {//voy llenando la columna, si ya tiene una ficha paso a la fila de arriba

        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.matrix[row][col]) {
                this.matrix[row][col] = circle;
                return this.coordCell(row, col);
            }
        }
        return null;
        //si esta llena hacer otra cosa;
    }

    isDropeable(circulo, col) {//si puedo dropear en la columna col(parametro) retorno true
        const circuloX = circulo.getPosX();
        const circuloY = circulo.getPosY();
        const cellX = this.startX + col * this.cellSize + this.cellSize / 2;
        const cellY = this.startY + 0 * this.cellSize + this.cellSize / 2;

        const distance = Math.sqrt((circuloX - cellX) ** 2 + (circuloY - cellY) ** 2);


        return distance < circulo.getRadius();

    }

    
    isColumnFull(col) {//me fijo si esa columna esta llena
        if(col != undefined){
            for (let row = 0; row < this.rows; row++) {
                if (this.matrix[row][col] === null) {
                    return false;
                }
            }
            return true;
        }
    }

    //metodos para chekear ganador
    cellsConnect(connect){//se fija todos los metodos para chekear y  si hay un connect devuelve las celdas ganadoras
        let connectedCells = this.connectHorizontal(connect);
        if(connectedCells.length === 0){
            connectedCells = this.connectVertical(connect);
        }
        if(connectedCells.length === 0) {
            connectedCells = this.connectDiagonal(connect);
        }
        return connectedCells;
    }

    connectHorizontal(connect) {//chekea si ganaron horizontalmente
        const connectedCells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                if (this.matrix[row][col] !== null) {
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if(this.matrix[row][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row][col + i])) {
                                inLineCells.push(this.matrix[row][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectVertical(connect) {//chekea si ganaron verticalmente
        const connectedCells = [];
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix[row][col] !== null) {
                    let firstCircle = this.matrix[row][col];
                    const inLineCells = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if (this.matrix[row + i][col] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col])) {
                                inLineCells.push(this.matrix[row + i][col]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCells.length === connect) {
                        connectedCells.push(...inLineCells);
                    }
                }
            }
        }
        return connectedCells;
    }

    connectDiagonal(connect) {//chekea si ganaron diagonalmente
        const connectedCells = [];
    
        // Diagonal de izquierda a derecha
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = 0; col <= this.cols - connect; col++) {
                if (this.matrix[row][col] !== null) {
                    const firstCircle = this.matrix[row][col];
                    const inLineCellsAsc = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if (this.matrix[row + i][col + i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col + i])) {
                                inLineCellsAsc.push(this.matrix[row + i][col + i]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCellsAsc.length === connect) {
                        connectedCells.push(...inLineCellsAsc);
                    }
                }
            }
        }
    
        // Diagonal de derecha a izquierda
        for (let row = 0; row <= this.rows - connect; row++) {
            for (let col = connect - 1; col < this.cols; col++) {
                if (this.matrix[row][col] !== null) {
                    const firstCircle = this.matrix[row][col];
                    const inLineCellsDesc = [firstCircle];
                    for (let i = 1; i < connect; i++) {
                        if (this.matrix[row + i][col - i] !== null) {
                            if (firstCircle.compareTo(this.matrix[row + i][col - i])) {
                                inLineCellsDesc.push(this.matrix[row + i][col - i]);
                            } else {
                                break;
                            }
                        }
                    }
                    if (inLineCellsDesc.length === connect) {
                        connectedCells.push(...inLineCellsDesc);
                    }
                }
            }
        }
    
        return connectedCells;
    }

    
    
    
    //getters y setters
    
    getCol(circulo) {//recorro las columnas y me fijo en cual la puedo dropear
        let col = 0;
        let cond = false;
        while (col < this.cols && cond === false) {
            if (this.isDropeable(circulo, col)) {
                cond = true;
                break;
            }
            col++;
        }
        if (col != this.cols) {
            return col;
        } else {
            return null;
        }
    }

    getSize() {
        const filas = this.matrix.length;
        const columnas = this.matrix[0].length;
        return filas * columnas;
    }

    getWidth() {
        return this.cols * this.cellSize;
    }

    getHeight() {
        return this.rows * this.cellSize;
    }

    getRows() {
        return this.rows;
    }

    setRows(value) {
        this.rows = value;
    }

    getCols() {
        return this.cols;
    }

    setCols(value) {
        this.cols = value;
    }
    getCellSize() {
        return this.cellSize;
    }
    setCellSize(value) {
        this.cellSize = value;
    }
    getStartX() {
        return this.startX;
    }
    setStartX(value) {
        this.startX = value;
    }
    getStartY() {
        return this.startY;
    }
    setStartY(value) {
        this.startY = value;
    }

}


