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

// A tua chave de API válida
const API_KEY = "8b5fd7403a7a807b729f4cedf129d102"; 

// A nova lista de cidades usa o nome e o código do país (mais robusto que o ID)
const CIDADES = [
    { nomeApi: 'Hernandarias,PY', elementoId: 'temperatura-her' },
    { nomeApi: 'Ciudad del Este,PY', elementoId: 'temperatura-cde' },
    { nomeApi: 'Foz do Iguacu,BR', elementoId: 'temperatura-foz' }
];

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


// Função que inicia o processo
function buscarClima() {
    CIDADES.forEach(cidade => {
        fazerPedidoClima(cidade);
    });
}


// A função de requisição (FETCH) foi ajustada para buscar por nome
function fazerPedidoClima(cidade) {
    // Agora o URL usa 'q' (query) em vez de 'id'
    const url = `${API_URL}?q=${cidade.nomeApi}&appid=${API_KEY}&units=metric&lang=pt`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Se der erro, mostra o erro no console
                throw new Error(`HTTP error! status: ${response.status} - Verifique o nome da cidade.`);
            }
            return response.json();
        })
        .then(data => {
            mostrarClimaNaPagina(cidade, data);
        })
        .catch(error => {
            console.error('Houve um problema com o pedido fetch:', error);
            document.getElementById(cidade.elementoId).innerHTML = 'Erro ao carregar clima.';
        });
}


// Função para mostrar o clima na página (sem alterações)
function mostrarClimaNaPagina(cidade, data) {
    const temperatura = Math.round(data.main.temp);
    const descricao = data.weather[0].description;
    const climaFormatado = descricao.charAt(0).toUpperCase() + descricao.slice(1);

    const htmlClima = `
        <div class="clima-info">
            <span class="temperatura">${temperatura}°C</span>
            <span class="descricao">${climaFormatado}</span>
        </div>
    `;

    const elemento = document.getElementById(cidade.elementoId);
    if (elemento) {
        elemento.innerHTML = htmlClima;
    }
}


// Inicia a função ao carregar a página
document.addEventListener('DOMContentLoaded', buscarClima);
