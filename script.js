// script.js

document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('header .links a');
    var secoes = document.querySelectorAll('main section');

    // Inicializa a primeira seção como visível e o body com o tema de Hernandarias
    document.querySelector('a[href="#her"]').classList.add('active');
    document.querySelector('#her').classList.add('visivel');
    document.body.classList.add('tema-her');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            var idAlvo = link.getAttribute('href');
            var secaoAlvo = document.querySelector(idAlvo);

            // Remove a classe 'active' de todos os links e a classe 'visivel' de todas as seções
            links.forEach(function(l) {
                l.classList.remove('active');
            });
            secoes.forEach(function(secao) {
                secao.classList.remove('visivel');
            });
            
            // Adiciona a classe 'active' ao link que foi clicado
            link.classList.add('active');

            // Adiciona a nova classe de tema ao body
            document.body.classList.remove('tema-her', 'tema-cde', 'tema-foz');
            var tema = 'tema-' + idAlvo.substring(1);
            document.body.classList.add(tema);

            // Adiciona a classe 'visivel' à seção alvo para exibi-la
            secaoAlvo.classList.add('visivel');

            // Rola a página para o topo, adicionando um comportamento suave
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});

// --- IMPORTANTE: CONFIGURAÇÃO ---
// Substitui a [SUA_CHAVE_AQUI] pela chave de API GRATUITA do OpenWeatherMap.
// POR ENQUANTO, DEIXE O PLACEHOLDER PARA TESTAR A LÓGICA DO CÓDIGO.
const API_KEY = "8b5fd7403a7a807b729f4cedf129d102"; 

// Lista de cidades e seus IDs, que o JavaScript vai procurar no HTML.
const CIDADES = [
    { id: 3438069, nome: 'Hernandarias', elementoId: 'temperatura-her' },
    { id: 3439404, nome: 'Ciudad del Este', elementoId: 'temperatura-cde' },
    { id: 3462947, nome: 'Foz do Iguaçu', elementoId: 'temperatura-foz' }
];

// URL base da API para buscar dados do clima
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


// --- FUNÇÃO PRINCIPAL ---
// Esta função inicia o processo para buscar o clima de todas as cidades
function buscarClima() {
    CIDADES.forEach(cidade => {
        fazerPedidoClima(cidade);
    });
}


// --- FUNÇÃO DE REQUISIÇÃO (FETCH) ---
// Faz o pedido à API do OpenWeatherMap
function fazerPedidoClima(cidade) {
    // Constrói o URL com ID, chave e unidade Celsius
    const url = `${API_URL}?id=${cidade.id}&appid=${API_KEY}&units=metric&lang=pt`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Erro HTTP (a chave provavelmente está errada, por isso o 401 ou 404)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Se tiver sucesso, chama a função para mostrar na tela
            mostrarClimaNaPagina(cidade, data);
        })
        .catch(error => {
            console.error('Houve um problema com o pedido fetch:', error);
            // Mensagem de erro que aparece na tela
            document.getElementById(cidade.elementoId).innerHTML = 'Erro ao carregar clima.';
        });
}


// --- FUNÇÃO PARA MOSTRAR NA PÁGINA ---
// Pega a resposta da API e formata o HTML
function mostrarClimaNaPagina(cidade, data) {
    // Arredonda a temperatura e pega a descrição
    const temperatura = Math.round(data.main.temp);
    const descricao = data.weather[0].description;
    
    // Deixa a primeira letra em maiúscula
    const climaFormatado = descricao.charAt(0).toUpperCase() + descricao.slice(1);

    const htmlClima = `
        <div class="clima-info">
            <span class="temperatura">${temperatura}°C</span>
            <span class="descricao">${climaFormatado}</span>
        </div>
    `;

    // Insere o HTML dentro da tag que tem o ID correto
    const elemento = document.getElementById(cidade.elementoId);
    if (elemento) {
        elemento.innerHTML = htmlClima;
    }
}


// --- INICIAR AO CARREGAR A PÁGINA ---
// Inicia a função buscarClima quando todo o HTML estiver carregado
document.addEventListener('DOMContentLoaded', buscarClima);