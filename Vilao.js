const { Inimigo } = require("./Inimigo");

class Vilao extends Inimigo {
    constructor(name, vida, questoes) {
        super(name, vida, questoes);
    }

}

module.exports = { Vilao };