class Circle {

    constructor(posX, posY, radius, team, context, club) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.club = club;

        //setClub(club);
        var src = this.setSrc();

        this.image = new Image();
        this.image.src = src;
        this.team = team;

        this.ctx = context;
        this.resaltadoEstilo = 'black';
        this.movido = false;

        this.posOriginalX = posX;
        this.posOriginalY = posY;
    }

    draw() {
        //this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);

        this.ctx.fillStyle = this.team;
        this.ctx.beginPath()
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        //this.ctx.fill()

        if (this.resaltado === true) {
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.drawImageAboveCircle();
    }

    setSrc() {
        if (this.club === 'boca') {
            return 'boca.png';
        }
        if (this.club === 'racing') {
            return 'racing.png';
        }
        if (this.club === 'barcelona') {
            return 'barcelona.png';
        }
        if (this.club === 'brasil') {
            return 'brasil.png';
        }
        if (this.club === 'river') {
            return 'river.png';
        }
        if (this.club === 'independiente') {
            return 'independiente.png';
        }
        if (this.club === 'real madrid') {
            return 'real madrid.png';
        }
        if (this.club === 'argentina') {
            return 'argentina.png';
        }
    }

    drawImageAboveCircle() {
        if (this.image) {
            // Calcula la posición de la imagen en relación al círculo
            const imageX = this.posX - this.radius; // Alinea la imagen con el borde izquierdo del círculo
            const imageY = this.posY - this.radius; // Alinea la imagen con la parte superior del círculo
            const imageWidth = this.radius * 2; // El ancho de la imagen es igual al diámetro del círculo
            const imageHeight = this.radius * 2; // La altura de la imagen es igual al diámetro del círculo

            // Dibuja la imagen encima del círculo
            this.ctx.drawImage(this.image, imageX, imageY, imageWidth, imageHeight);
        }
    }

    posOriginal() {
        const cord = { x: this.posOriginalX, y: this.posOriginalY };
        this.returnTo(cord);

    }

    compareTo(c2) {
        return this.getTeam() === c2.getTeam();
    }

    returnTo(cord) {
        if (!this.movido) {
            const targetX = cord.x;
            const targetY = cord.y;

            // Calcula las diferencias en las coordenadas X e Y
            const dx = (targetX - this.posX) / 60;
            const dy = (targetY - this.posY) / 60;

            const animate = () => {
                update();
                this.ctx.beginPath()
                // Verifica si el círculo ha llegado a la posición objetivo
                if (Math.abs(this.posX - targetX) < Math.abs(dx) || Math.abs(this.posY - targetY) < Math.abs(dy)) {
                    this.setPositionAnimacion(targetX, targetY);
                    this.draw();
                    return;
                }

                // Mueve el círculo gradualmente
                this.setPositionAnimacion(this.posX + dx, this.posY + dy);
                this.draw();

                requestAnimationFrame(animate);
                this.ctx.closePath();
            };
            animate();
            this.setResaltado(false);
        }
    }
    moveTo(cord) {
        const targetX = cord.x;
        const targetY = cord.y;

        // Calcula las diferencias en las coordenadas X e Y
        const dx = (targetX - this.posX) / 60;
        const dy = (targetY - this.posY) / 60;

        const animate = () => {
            update();
            this.ctx.beginPath()
            // Verifica si el círculo ha llegado a la posición objetivo
            if (Math.abs(this.posX - targetX) < Math.abs(dx) || Math.abs(this.posY - targetY) < Math.abs(dy)) {
                this.setPositionAnimacion(targetX, targetY);
                this.draw();
                return;
            }

            // Mueve el círculo gradualmente
            this.setPositionAnimacion(this.posX + dx, this.posY + dy);
            this.draw();

            requestAnimationFrame(animate);
            this.ctx.closePath();
        };
        animate();
        this.setResaltado(false);
        this.movido = true;
        setTimeout(function () {
            update();
        }, 370);
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

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    isWinner() {
        this.resaltadoEstilo = 'yellow';
        this.resaltado = true;
    }

    setResaltado(resaltado) {
        if(this.resaltadoEstilo === 'yellow'){
            return;
        } 
        if (!this.movido) {
            this.resaltado = resaltado;
        } else {
            this.resaltado = null;
        }
    }

    getResaltado() {
        return this.resaltadoEstilo;
    }

    setTeam(team) {
        this.team = team;
    }

    setPositionAnimacion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setPosition(x, y) {
        if (!this.movido) {
            this.posX = x;
            this.posY = y;
        }
    }

    getMovido() {
        return this.movido;
    }

    setMovido(param) {
        this.movido = param;
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

    getTeam() {
        return this.team;
    }
}