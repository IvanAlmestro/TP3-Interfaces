class Player{
    constructor(nombre, arr) {
        this.nombre = nombre
        this.ganador = false;
        this.disks = arr || [];
    }

    getDiks(){//devuelve las fichas del jugador
        console.log(this.disks)
    }

    disksContains(disk){//true si contiene una ficha
        for(const elem of this.disks){
            if(elem.compareTo(disk)){
                return true;
            }
        }
        return false;
    }

    dropDisk(col, disk, board,game){//dropea el disco en una columna
        let cord = board.fillCol(col,disk);
        if(cord !== null){
            disk.moveTo(cord);
            game.switchTurn();
        }
    }

    getName(){
        return this.nombre;
    }

    setName(nombre){
        this.nombre = nombre;
    }
}