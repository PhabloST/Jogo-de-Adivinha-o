// Variáveis globais do jogo
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 0;

// Elementos do DOM
const inputPalpite = document.getElementById('palpiteInput');
const adivinharButton = document.getElementById('adivinharButton');
const reiniciarButton = document.getElementById('reiniciarButton');
const divMensagem = document.getElementById('mensagem');
const divContador = document.getElementById('contadorTentativas');

// Esconde o botão reiniciar ao iniciar o jogo
reiniciarButton.style.display = 'none';

// Permite usar a tecla "Enter" para enviar o palpite
inputPalpite.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificarPalpite();
    }
});

function gerarNumeroSecreto() {
    return Math.floor(Math.random() * 100) + 1;
}

function verificarPalpite() {
    const palpite = parseInt(inputPalpite.value, 10);

    // Validação de entrada
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        divMensagem.textContent = 'Por favor, insira um número entre 1 e 100.';
        divMensagem.style.color = '#dc3545'; // Vermelho para erro
        return;
    }

    // Atualiza contador
    tentativas++;
    divContador.textContent = `Tentativas: ${tentativas}`;

    // Lógica do jogo
    if (palpite === numeroSecreto) {
        divMensagem.innerHTML = `Parabéns, você conseguiu!, o número secreto era <strong>${numeroSecreto}</strong>!`;
        divMensagem.style.color = '#28a745'; // Verde para certo

        // Finaliza a rodada
        inputPalpite.disabled = true;
        adivinharButton.disabled = true;
        reiniciarButton.style.display = 'block';
    } else if (palpite < numeroSecreto) {
        divMensagem.textContent = 'O número secreto é MAIOR.';
        divMensagem.style.color = '#007bff'; // Azul dica
    } else {
        divMensagem.textContent = 'O número secreto é MENOR.';
        divMensagem.style.color = '#fd7e14'; // Laranja dica
    }

    // Limpa o input para o próximo palpite e foca nele
    inputPalpite.value = '';
    inputPalpite.focus();
}

function reiniciarJogo() {
    // Reseta variáveis
    numeroSecreto = gerarNumeroSecreto();
    tentativas = 0;

    // Reseta a interface
    divContador.textContent = 'Tentativas: 0';
    divMensagem.textContent = '';
    inputPalpite.disabled = false;
    adivinharButton.disabled = false;
    reiniciarButton.style.display = 'none';
    inputPalpite.value = '';
    inputPalpite.focus();
}