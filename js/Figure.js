class Figure {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red';
        this.ctx = context;
        this.movido = false;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosition(x, y) {
        if(!this.movido){
            this.posX = x;
            this.posY = y;
        }
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }

    getfill() {
        return this.fill;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
    }

    setResaltado(resaltado) {
        if(!this.movido){
            this.resaltado = resaltado;
        }else{
            this.resaltado = null;
        }
    }
    
    isPointInside(x, y) { };
    
}