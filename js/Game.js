class Game {
    constructor(players, board, disks, connect) {
        this.connect = connect;
        this.board = board;
        this.disks = disks;
        this.players = players.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador

        this.startingMinutes = 1;
        this.time = this.startingMinutes * 60;
        this.countDown = document.getElementById('timer');
        this.timerInterval = null;
    }

    startTimer() {
        document.getElementById("timer").style.display = "block";
        this.timerInterval = setInterval(() => {
            this.updateTimer(); // Actualiza el temporizador cada segundo
            if (this.time <= 0) {
                clearInterval(this.timerInterval);
                this.switchTurn(); // Cambia de jugador cuando el tiempo llega a 00
                update();
                this.time = this.startingMinutes * 60; // Reinicia el tiempo
                this.startTimer(); // Inicia el temporizador nuevamente
            }
        }, 1000);
    }

    updateTimer() {
        console.log("reinicia");
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        this.countDown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.time--;
    }

    resetTimer() {
        clearInterval(this.timerInterval); // Detiene el temporizador actual (si está en marcha)
        this.time = this.startingMinutes * 60; // Reinicia el tiempo
        this.startTimer(); // Inicia el temporizador nuevamente
    }


    winGame() {
        let cellsConnect = this.board.cellsConnect(this.connect);
        if (cellsConnect.length > 0) {
            this.showWinnerDisks(cellsConnect);
            this.switchTurn();
            console.log("Gano", this.getCurrentPlayer().getName());
            this.endGame();
            showWinner();
     
        }
    }

    endGame() {
        for (let i = 0; i < this.disks.length; i++) {
            const disk = this.disks[i];
            disk.setMovido(true);
        }
        
    }

    showWinnerDisks(disks) {
        for (let i = 0; i < disks.length; i++) {
            const disk = disks[i];
            disk.isWinner();
        }
    }

    switchTurn() {
        this.resetTimer();
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }



    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }
}