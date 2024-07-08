const readline = require('readline');
const { Personagem } = require('./Personagem');
const { Inimigo } = require('./Inimigo');
const { Vilao } = require('./Vilao');
const prompt = require("prompt-sync")();

// Configuração da interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para perguntar e esperar a resposta do jogador
function askQuestion(question, opcoes) {
    return new Promise((resolve) => {
        rl.question(`${question}\nOpcoes: ${opcoes.join(', ')}\n`, (answer) => {
            resolve(answer);
        });
    });
}

function pausaGame(){
    prompt("Pressione enter para prosseguir!")
}

// Função para iniciar o jogo
async function startGame() {
    const nome_hero = prompt("Bem vindo ao jogo heroi do enigma, porfavor, digite o nome do seu heroi: ")
    const personagem = new Personagem(nome_hero, 3);

    console.log(`Ola ${nome_hero}, nesse momento voce se encontra em uma missao muito importante para derrotar o grande vilao que vem atormentando os grandes eventos de enigmas, em sua jornada voce foi desafiado(a) a uma batalha de enigmas pela sua honra como grande Mestre dos Enigmas, derrote os tres inimigos primeiro para chegar ate o grande vilao e conquiste sua vitoria!`)
    console.log(`${nome_hero}, voce comeca com 3 vidas, para resposta incorreta voce perde 1 de vida e para cada inimigo que voce conseguir derrotar, vai receber um acrescimo de mais 2 vidas.`)
    console.log("Boa sorte!")

    pausaGame()
    

    const inimigos = [
        new Inimigo('Inimigo 1', 3, [
            { questao: "Questao 1", opcoes: ["A", "B", "C"], respostaCorreta: "A" },
            { questao: "Questao 2", opcoes: ["A", "B", "C"], respostaCorreta: "B" }
        ]),
        new Inimigo('Inimigo 2', 3, [
            { questao: "Questao 3", opcoes: ["A", "B", "C"], respostaCorreta: "C" },
            { questao: "Questao 4", opcoes: ["A", "B", "C"], respostaCorreta: "A" }
        ]),
        new Inimigo('Inimigo 3', 3, [
            { questao: "Questao 5", opcoes: ["A", "B", "C"], respostaCorreta: "B" },
            { questao: "Questao 6", opcoes: ["A", "B", "C"], respostaCorreta: "C" }
        ])
    ];

    const vilao = new Vilao('Vilao Final', 5, [
        { questao: "Questao 7", opcoes: ["A", "B", "C"], respostaCorreta: "A" },
        { questao: "Questao 8", opcoes: ["A", "B", "C"], respostaCorreta: "B" }
    ]);

    let inimigoAtualIndex = 0;

    // Laço principal do jogo
    while (personagem.isAlive() && inimigoAtualIndex < inimigos.length) {
        const inimigo = inimigos[inimigoAtualIndex];
        console.log(`Lutando contra ${inimigo.name}`);

        let i = 0;
        while (i < inimigo.questoes.length) {
            const questao = inimigo.questoes[i];
            const respostaUsuario = await askQuestion(questao.questao, questao.opcoes);

            if (inimigo.askQuestion(i, respostaUsuario)) {
                console.log('Correto!');
                i++; // Avança para a próxima pergunta
            } else {
                console.log('Errado!');
                personagem.loseLife();
                console.log(`Voce possui ${personagem.vida} de vida!`)
            }

            if (!personagem.isAlive()) {
                console.log('Game Over!');
                rl.close();
                return;
            }
        }
        

        personagem.gainLife();
        console.log(`Parabens ${nome_hero}, voce ganhou mais 2 vidas!`)
        console.log(`Voce possui ${personagem.vida} de vida!`)
        inimigoAtualIndex++;
    }

    if (personagem.isAlive()) {
        console.log(`Parabens ${nome_hero}, voce conquistou o direito de lutar contra o vilao final!`);
        pausaGame()
        console.log('Vilao final!!!');
        // Similar ao laço acima, mas para o chefe final
        let i = 0;
        while (i < vilao.questoes.length) {
            const questao = vilao.questoes[i];
            const respostaUsuario = await askQuestion(questao.questao, questao.opcoes);

            if (vilao.askQuestion(i, respostaUsuario)) {
                console.log('Correto!');
                i++; // Avança para a próxima pergunta
            } else {
                console.log('Errado!');
                personagem.loseLife();
                console.log(`Voce possui ${personagem.vida} de vida!`)
            }

            if (!personagem.isAlive()) {
                console.log('Infelizmente voce nao conseguiu, Game Over!');
                rl.close();
                return;
            }
        }
        console.log(`Voce derrotou o vilao e conquistou o titulo de grande mestre dos enigmas! Parabens ${nome_hero}!`);
    }

    rl.close();
}

// Inicia o jogo
startGame();
