class Game {
    constructor(players, board, disks, connect) {
        this.connect = connect;
        this.board = board;
        this.disks = disks;
        this.players = players.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador

        this.startingMinutes = 5;
        this.time = this.startingMinutes * 60;
        this.countDown = document.getElementById('timer');
        this.timerInterval = null;
    }

    startTimer() {//inicializo el timer 
        document.getElementById("timer").style.display = "block";
        this.timerInterval = setInterval(() => {
            this.updateTimer(); //actualiza el temporizador cada segundo
            if (this.time === 0) {
                this.endGame();
                showWinner(true);
                this.stopTimer();
                clearInterval(this.timerInterval);
                update();
            }
        }, 1000);
    }

    updateTimer() {//actualizo el timer(se llama todo el tiempo a esta funcion)
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.countDown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.time--;
    }

    resetTimer() {//reinicio el timer
        clearInterval(this.timerInterval); // Detiene el temporizador actual (si está en marcha)
        this.time = this.startingMinutes * 60; // Reinicia el tiempo
        this.startTimer(); // Inicia el temporizador nuevamente
    }

    stopTimer() {//freno el timer
        clearInterval(this.timerInterval);
    }

    winGame() {//muestra al ganador y termina el juego
        let cellsConnect = this.board.cellsConnect(this.connect);
        if (cellsConnect.length > 0) {
            this.showWinnerDisks(cellsConnect);
            this.switchTurn();
            this.endGame();
            showWinner(false);
            this.stopTimer();
        }
    }

    endGame() {//hace que no se pueda mover ninguna ficha
        for (let i = 0; i < this.disks.length; i++) {
            const disk = this.disks[i];
            disk.setMovido(true);
        }
        
    }

    showWinnerDisks(disks) {//marca las fichas ganadoras
        for (let i = 0; i < disks.length; i++) {
            const disk = disks[i];
            disk.isWinner();
        }
    }

    switchTurn() {//cambia el turno del jugador
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    getCurrentPlayer() {//devuelve el jugador actual
        return this.players[this.currentTurn];
    }
}