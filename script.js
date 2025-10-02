document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("header .links a");
  var secoes = document.querySelectorAll("main section");

  document.querySelector('a[href="#her"]').classList.add("active");
  document.querySelector("#her").classList.add("visivel");
  document.body.classList.add("tema-her");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      var idAlvo = link.getAttribute("href");
      var secaoAlvo = document.querySelector(idAlvo);

      links.forEach(function (l) {
        l.classList.remove("active");
      });
      secoes.forEach(function (secao) {
        secao.classList.remove("visivel");
      });

      link.classList.add("active");

      document.body.classList.remove("tema-her", "tema-cde", "tema-foz");
      var tema = "tema-" + idAlvo.substring(1);
      document.body.classList.add(tema);

      secaoAlvo.classList.add("visivel");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
});

const API_KEY = "8b5fd7403a7a807b729f4cedf129d102";

const CIDADES = [
  { nomeApi: "Hernandarias,PY", elementoId: "temperatura-her" },
  { nomeApi: "Ciudad del Este,PY", elementoId: "temperatura-cde" },
  { nomeApi: "Foz do Iguacu,BR", elementoId: "temperatura-foz" },
];

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function buscarClima() {
  CIDADES.forEach((cidade) => {
    fazerPedidoClima(cidade);
  });
}

function fazerPedidoClima(cidade) {
  const url = `${API_URL}?q=${cidade.nomeApi}&appid=${API_KEY}&units=metric&lang=pt`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Erro HTTP! Status: ${response.status}. Verifique se a sua chave está ativa.`
        );
      }
      return response.json();
    })
    .then((data) => {
      mostrarClimaNaPagina(cidade, data);
    })
    .catch((error) => {
      console.error("Houve um problema com o pedido fetch:", error);

      document.getElementById(cidade.elementoId).innerHTML =
        "Erro ao carregar clima.";
    });
}

function mostrarClimaNaPagina(cidade, data) {
  const temperatura = Math.round(data.main.temp);
  const descricao = data.weather[0].description;
  const idIcone = data.weather[0].icon;

  const climaFormatado = descricao.charAt(0).toUpperCase() + descricao.slice(1);

  const classeIcone = obterClasseIcone(idIcone);

  const htmlClima = `
        <div class="clima-info">
            <i class="${classeIcone} clima-icone"></i>
            <span class="temperatura">${temperatura}°C</span>
            <span class="descricao">${climaFormatado}</span>
        </div>
    `;

  const elemento = document.getElementById(cidade.elementoId);
  if (elemento) {
    elemento.innerHTML = htmlClima;
  }
}

function obterClasseIcone(iconCode) {
  switch (iconCode) {
    case "01d":
      return "☀️";
    case "01n":
      return "⭐";
    case "02d":
    case "03d":
    case "04d":
      return "☁️";
    case "02n":
    case "03n":
    case "04n":
      return "☁️";
    case "09d":
    case "10d":
    case "11d":
      return "🌧️";
    case "10n":
    case "11n":
      return "🌧️";
    case "13d":
    case "13n":
      return "❄️";
    case "50d":
    case "50n":
      return "🌫️";
    default:
      return "🌎";
  }
}

function mostrarClimaNaPagina(cidade, data) {
  const temperatura = Math.round(data.main.temp);
  const descricao = data.weather[0].description;
  const idIcone = data.weather[0].icon;

  const climaFormatado = descricao.charAt(0).toUpperCase() + descricao.slice(1);

  const emojiIcone = obterClasseIcone(idIcone);

  const htmlClima = `
        <div class="clima-info">
            <span class="clima-icone-emoji">${emojiIcone}</span>
            <span class="temperatura">${temperatura}°C</span>
            <span class="descricao">${climaFormatado}</span>
        </div>
    `;

  const elemento = document.getElementById(cidade.elementoId);
  if (elemento) {
    elemento.innerHTML = htmlClima;
  }
}

document.addEventListener("DOMContentLoaded", buscarClima);

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const iconSun = toggleButton.querySelector(".fa-sun");
const iconMoon = toggleButton.querySelector(".fa-moon");

const THEME_STORAGE_KEY = "siteTheme";

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    iconSun.style.display = "none";
    iconMoon.style.display = "inline";
  } else {
    body.classList.remove("dark-mode");
    iconSun.style.display = "inline";
    iconMoon.style.display = "none";
  }
}

function toggleTheme() {
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");
  if (isDarkMode) {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    iconSun.style.display = "none";
    iconMoon.style.display = "inline";
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    iconSun.style.display = "inline";
    iconMoon.style.display = "none";
  }
}

toggleButton.addEventListener("click", toggleTheme);

applySavedTheme();
