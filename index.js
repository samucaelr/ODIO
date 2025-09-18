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