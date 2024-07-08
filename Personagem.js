class Personagem {
    constructor(name, vida) {
        this.name = name;
        this.vida = vida;
    }

    // Método para perder vida
    loseLife() {
        this.vida--;
    }

    // Método para ganhar vida
    gainLife() {
        this.vida += 2;
    }

    isAlive() {
        return this.vida > 0;
    }
}

module.exports = { Personagem };
