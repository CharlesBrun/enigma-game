const { Inimigo } = require("./Inimigo");

class Vilao extends Inimigo {
    constructor(name, vida, questoes) {
        super(name, vida, questoes);
    }

    // Pode ter habilidades especiais ou perguntas mais difíceis
}

module.exports = { Vilao };