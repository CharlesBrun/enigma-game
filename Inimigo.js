const { Personagem } = require("./Personagem");

class Inimigo extends Personagem {
    constructor(name, vida, questoes) {
        super(name, vida);
        this.questoes = questoes;
    }

    // Método para perguntar e verificar resposta
    askQuestion(index, resposta) {
        if (this.questoes[index].respostaCorreta === resposta) {
            return true;
        } else {
            this.loseLife();
            return false;
        }
    }
}

module.exports = { Inimigo };