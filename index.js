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
            resolve(answer.toLowerCase()); // Padroniza a resposta para minúsculas
        });
    });
}

function pausaGame(){
    prompt("Pressione Enter para prosseguir!\n");
}

// Função para iniciar o jogo
async function startGame() {
    const nome_heroi = prompt("Bem-vindo ao jogo Herói do Enigma! Por favor, digite o nome do seu herói: ");
    const personagem = new Personagem(nome_heroi, 3);

    console.log(`Olá ${nome_heroi}, neste momento você se encontra em uma missão muito importante para derrotar o grande vilão que vem atormentando o grande evento de enigmas. \nEm sua jornada, você foi desafiado(a) a uma batalha de enigmas pela sua honra como grande Mestre dos Enigmas. Derrote os três inimigos primeiro para chegar até o grande vilão e conquiste sua vitória!`);
    console.log(`${nome_heroi}, você começa com 3 vidas. Para cada resposta incorreta, você perde 1 vida, e para cada inimigo que você conseguir derrotar, vai receber um acréscimo de mais 2 vidas.`);
    console.log("Boa sorte!\n");

    pausaGame();
    

    const inimigos = [
        new Inimigo('Inimigo 1', 3, [
            { 
                questao: "Questão 1 - O que é o que é: passa diante do sol e não faz sombra?", 
                opcoes: ["A - O vento.", "B - O fantasma.", "C - A moral."], 
                respostaCorreta: "a" 
            },
            { 
                questao: "Questão 2 - O que é o que é: é cheia de furinhos, mas consegue reter água?", 
                opcoes: ["A - O queijo.", "B - A esponja.", "C - A vassoura."], 
                respostaCorreta: "b" 
            }
        ]),
        new Inimigo('Inimigo 2', 3, [
            { 
                questao: "Questão 3 - O que é o que é: quanto mais eu tiro, mais eu tenho?", 
                opcoes: ["A - Dinheiro.", "B - Farinha.", "C - Fotografias."], 
                respostaCorreta: "c" 
            },
            { 
                questao: "Questão 4 - Qual é o queijo que mais sente dor?", 
                opcoes: ["A - O queijo ralado.", "B - O queijo padrão.", "C - O queijo gorgonzola."], 
                respostaCorreta: "a" 
            }
        ]),
        new Inimigo('Inimigo 3', 3, [
            { 
                questao: "Questão 5 - O que é o que é: uma pergunta que você nunca pode responder com “sim”?", 
                opcoes: ["A - Zebra seria preta com listras brancas?", "B - Você está dormindo?", "C - A laranja pode ser fruta?"], 
                respostaCorreta: "b" 
            },
            { 
                questao: "Questão 6 - O que é o que é: quanto mais seca, mais molhada fica?", 
                opcoes: ["A - O pano de chão.", "B - A roupa.", "C - A toalha."], 
                respostaCorreta: "c" 
            }
        ])
    ];

    const vilao = new Vilao('Vilão Final', 5, [
        { 
            questao: "Questão 7 - Quais são os três números, nenhum dos quais é zero, que dão o mesmo resultado, quer sejam somados ou multiplicados?", 
            opcoes: ["A - 1, 2 e 3.", "B - 4, 5 e 6.", "C - 7, 8 e 9"], 
            respostaCorreta: "a" 
        },
        { 
            questao: `Questão 8 - A é irmão de B
            B é irmão de C
            C é a mãe de D
            Qual é o parentesco entre D e A?`, 
            opcoes: ["A - A é o avo de D.", "B - A é o tio de D.", "C - A é o pai de D."], 
            respostaCorreta: "b"
        }
    ]);

    let inimigoAtualIndex = 0;

    // Laço principal do jogo
    while (personagem.isAlive() && inimigoAtualIndex < inimigos.length) {
        const inimigo = inimigos[inimigoAtualIndex];
        console.log(`Lutando contra ${inimigo.name}\n`);

        let i = 0;
        while (i < inimigo.questoes.length) {
            const questao = inimigo.questoes[i];
            const respostaUsuario = await askQuestion(questao.questao, questao.opcoes);

            if (inimigo.askQuestion(i, respostaUsuario)) {
                console.log('Correto!\n');
                i++; // Avança para a próxima pergunta
            } else {
                console.log('Errado!');
                personagem.loseLife();
                console.log(`Você possui ${personagem.vida} vida(s)!\n`);
            }

            if (!personagem.isAlive()) {
                console.log('Game Over!');
                rl.close();
                return;
            }
        }
        

        personagem.gainLife();
        console.log(`Parabéns ${nome_heroi}, você ganhou mais 2 vidas!`);
        console.log(`Você possui ${personagem.vida} vida(s)!\n`);
        inimigoAtualIndex++;
    }

    if (personagem.isAlive()) {
        console.log(`Parabéns ${nome_heroi}, você conquistou o direito de lutar contra o vilão final!`);
        pausaGame();
        console.log('Vilão final!!!\n');
        // Similar ao laço acima, mas para o chefe final
        let i = 0;
        while (i < vilao.questoes.length) {
            const questao = vilao.questoes[i];
            const respostaUsuario = await askQuestion(questao.questao, questao.opcoes);

            if (vilao.askQuestion(i, respostaUsuario)) {
                console.log('Correto!\n');
                if(i==0){
                    console.log("Explicacão:\n1, 2 e 3, porque: \n1 + 2 + 3 = 6 e 1 x 2 x 3 = 6\n");
                }
                i++; // Avança para a próxima pergunta
            } else {
                console.log('Errado!');
                personagem.loseLife();
                console.log(`Você possui ${personagem.vida} vida(s)!\n`);
            }

            if (!personagem.isAlive()) {
                console.log('Infelizmente você não conseguiu. Game Over!\n');
                rl.close();
                return;
            }
        }
        console.log(`Você derrotou o vilão e conquistou o título de grande Mestre dos Enigmas! Parabéns ${nome_heroi}!`);
    }

    rl.close();
}

// Inicia o jogo
startGame();
