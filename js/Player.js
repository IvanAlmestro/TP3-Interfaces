class Player{
    constructor(nombre, arr) {
        this.nombre = nombre
        this.ganador = false;
        this.disks = arr || [];
    }

    //giveDisks(discos) {
    //    console.log(discos);
    //    this.disks.concat(discos);
    //    console.log(this.disks);
    //}

    getDiks(){
        console.log(this.disks)
    }

    disksContains(disk){
        for(const elem of this.disks){
            if(elem.compareTo(disk)){
                return true;
            }
        }
        return false;
    }

    dropDisk(col, disk, board,game){
        let cord = board.fillCol(col,disk);
        disk.moveTo(cord);
        game.switchTurn();
    }

    moveDisc(cord, disk) {
        console.log(this.disks)
        if (this.disksContains(disk)) {
            console.log("A");

            const targetX = cord.x;
            const targetY = cord.y;

            // Calcula las diferencias en las coordenadas X e Y
            const dx = (targetX - disk.getPosX()) / 60;
            const dy = (targetY - disk.getPosY()) / 60;

            const animate = () => {
                update();
                disk.ctx.beginPath()
                // Verifica si el círculo ha llegado a la posición objetivo
                if (Math.abs(disk.getPosX() - targetX) < Math.abs(dx) || Math.abs(disk.getPosY() - targetY) < Math.abs(dy)) {
                    disk.setPositionAnimacion(targetX, targetY);
                    disk.draw();
                    return;
                }

                // Mueve el círculo gradualmente
                disk.setPositionAnimacion(disk.getPosX() + dx, disk.getPosY() + dy);
                disk.draw();

                requestAnimationFrame(animate);
                disk.ctx.closePath();
            };
            animate();
            disk.setResaltado(false);
            disk.movido = true;
        } else {
            console.log("B");
        }


    }

    getName(){
        return this.nombre;
    }

    setName(nombre){
        this.nombre = nombre;
    }
}