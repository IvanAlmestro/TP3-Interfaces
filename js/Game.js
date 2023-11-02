class Game {
    constructor(players, board, disks, connect) {
        this.connect = connect;
        this.board = board;
        this.disks = disks;
        this.players = players.slice(0, 2);//solo puedo tener 2 players
        this.currentTurn = 0; // Comienza con el primer jugador
        
    }

    winGame(){
        let cellsConnect = this.board.cellsConnect(this.connect);
        if(cellsConnect.length > 0){
            this.showWinnerDisks(cellsConnect);
            this.switchTurn();
            console.log("Gano", this.getCurrentPlayer().getName());
            this.endGame();
            showButtonReset();
        }
    }

    endGame(){
        for(let i = 0; i < this.disks.length; i++){
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
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }



    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }
}