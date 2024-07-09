class Personagem {
    constructor(name, vida) {
        this.name = name;
        this.vida = vida;
    }

    // Método para perder vida
    loseLife() {
        this.vida--;
        console.log(`${this.name} perdeu uma vida. Vidas restantes: ${this.health}`);
    }

    // Método para ganhar vida
    gainLife() {
        this.vida += 2;
    }

    // Método para verificar se o personagem esta com vida restante
    isAlive() {
        return this.vida > 0;
    }
}

module.exports = { Personagem };
