const { Personagem } = require("./Personagem");

class Inimigo extends Personagem {
    constructor(name, vida, questoes) {
        super(name, vida);
        this.questoes = questoes;
    }

    // Método para perguntar e verificar resposta
    realizarPergunta(index, resposta) {
        return this.questoes[index].respostaCorreta === resposta;
    }
}

module.exports = { Inimigo };