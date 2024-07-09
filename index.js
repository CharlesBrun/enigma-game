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
function askQuestion(questao, opcoes) {
    return new Promise((resolve) => {
        rl.question(`${questao}\nOpcoes: ${opcoes.join(', ')}\n`, (answer) => {
            resolve(answer.toLowerCase()); // Padroniza a resposta para minúsculas
        });
    });
}

function pausaGame(){
    prompt("Pressione Enter para prosseguir!\n");
}

async function desafioVilao(personagem, nome_heroi){
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

    if (personagem.isAlive()) {
        console.log(`Parabéns ${nome_heroi}, você conquistou o direito de lutar contra o vilão final!`);
        pausaGame();
        console.log('Final Boss!');
        console.log("Você se encontra face a face com o vilão final, uma figura temível que emana uma aura de poder e mistério. Ele sorri maliciosamente e diz: 'Finalmente, um verdadeiro desafiante. Vamos ver se você é digno do título de Grande Mestre Enigma.'");
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
        console.log('Você derrotou o chefe! Parabéns!');
        console.log('Com uma última e brilhante resposta, o vilão final cai de joelhos, derrotado. A multidão explode em aplausos, e você é proclamado o Grande Mestre Enigma. Parabéns, sua jornada épica chegou ao fim com um triunfo glorioso!');
    }
}

async function inimigosDesafio(personagem, nome_heroi){
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
}

function pegaNomeHeroi() {
    const nome_heroi = prompt("Bem-vindo ao jogo Herói do Enigma! Por favor, digite o nome do seu herói: "); 
    if (nome_heroi.length === 0) return nome_heroi; // Verifica se o nome_heroi não está vazio
    return nome_heroi.charAt(0).toUpperCase() + nome_heroi.slice(1).toLowerCase();
}

// Função para iniciar o jogo
async function startGame() {
    const nome_heroi = pegaNomeHeroi();
    const personagem = new Personagem(nome_heroi, 3);

    console.log(`Olá ${nome_heroi}, neste momento você se encontra em uma missão muito importante para conquistar o mais alto titulo. \nEm sua jornada, você foi desafiado(a) a uma batalha de enigmas para conquistar o titulo maximo de Grande Mestre Enigma. Derrote os três inimigos primeiro para chegar até o grande vilão e conquiste sua vitória!\n`);
    console.log('Atualmente existem os seguintes titulos:\nProfessor enigma.\nMago enigma.\nDoutor enigma.\nMestre enigma.\nGrande Mestre enigma.\n')
    console.log(`${nome_heroi}, você começa com 3 vidas. Para cada resposta incorreta, você perde 1 vida, e para cada inimigo que você conseguir derrotar, vai receber um acréscimo de mais 2 vidas.`);
    console.log("Boa sorte!\n");

    pausaGame();
    await inimigosDesafio(personagem, nome_heroi);

    //Estrutura de decisão para permitir uma forma de escolher entre um titulo menor.
    if(personagem.vida >= 9){
        console.log("Você chegou até aqui com nove vidas, você está indo muito bem!");
        console.log("Após a batalha intensa, você é recebido com aplausos por uma multidão e, surpreendentemente, o presidente do evento, um homem sábio e misterioso, se aproxima de você.");
        console.log("Ele diz: 'Sua performance tem sido exemplar, guerreiro. Por isso, estou aqui para lhe oferecer um título raro e valioso, o título de Mestre Enigma. Aceitar esse título significa reconhecer sua incrível habilidade e sagacidade. Mas, se preferir, você pode continuar sua jornada e enfrentar o vilão final para conquistar o título de Grande Mestre Enigma, uma honra ainda maior.\n'");
        console.log("Você deve escolher sabiamente. Caso aceite o título de Mestre Enigma, digite 'aceito'. Caso decida continuar e enfrentar o vilão final, digite 'não aceito'.");


        let lacoContrato = true;
        let aceiteContrato;
        do {
            aceiteContrato = prompt("Qual a sua escolha? ").toLowerCase();
            if(aceiteContrato == 'aceito' || aceiteContrato == 'nao aceito'){
                lacoContrato = false;
            }else{
                console.log("Valor incorreto inserido, digite novamente 'aceito' ou 'nao aceito'...");
            }
        } while (lacoContrato);

        if(aceiteContrato == "nao aceito"){
            console.log('Com uma determinação feroz, você decide continuar sua jornada e se prepara para enfrentar o vilão final!');
            await desafioVilao(personagem, nome_heroi);
        }else{
            console.log('Parabéns! Você recebeu o título de Mestre Enigma e é saudado como um dos maiores enigmatistas da história!\n');
            console.log("\nFim de jogo e obrigado por jogar...")
            rl.close();
            return;
        }
    }else{
        await desafioVilao(personagem, nome_heroi);
        console.log("\nFim de jogo e obrigado por jogar...")
    }


    rl.close();
}

// Inicia o jogo
startGame();
