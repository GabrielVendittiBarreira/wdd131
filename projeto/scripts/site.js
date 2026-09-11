const cafes = [
  {
    nome: "Café da Praça",
    categoria: "estudo",
    destaque: true,
    imagem: "imagens/cafeteria-estudo.svg",
    alt: "Mesa de cafeteria com notebook e xícara",
    descricao: "Ambiente silencioso, boas tomadas e mesas individuais para estudar ou trabalhar.",
    detalhe: "Melhor para manhãs tranquilas"
  },
  {
    nome: "Grão & Conversa",
    categoria: "amigos",
    destaque: true,
    imagem: "imagens/cafeteria-amigos.svg",
    alt: "Duas xícaras de café em uma mesa",
    descricao: "Espaço acolhedor para encontros, sobremesas e conversas sem pressa.",
    detalhe: "Melhor para finais de tarde"
  },
  {
    nome: "Torra Urbana",
    categoria: "especial",
    destaque: true,
    imagem: "imagens/cafeteria-especial.svg",
    alt: "Saco de grãos de café e método filtrado",
    descricao: "Cardápio com grãos especiais, métodos filtrados e equipe preparada para explicar sabores.",
    detalhe: "Melhor para experimentar grãos"
  }
];

const metodos = [
  {
    nome: "V60",
    sabor: "suave",
    nivel: "iniciante",
    imagem: "imagens/metodo-v60.svg",
    descricao: "Método filtrado com xícara limpa, acidez agradável e bom controle da extração."
  },
  {
    nome: "Prensa Francesa",
    sabor: "encorpado",
    nivel: "iniciante",
    imagem: "imagens/metodo-prensa.svg",
    descricao: "Preparo simples, corpo marcante e textura mais intensa por manter óleos naturais do café."
  },
  {
    nome: "Espresso",
    sabor: "intenso",
    nivel: "avancado",
    imagem: "imagens/metodo-espresso.svg",
    descricao: "Bebida curta, concentrada e intensa, ideal para quem gosta de sabor forte."
  },
  {
    nome: "Aeropress",
    sabor: "suave",
    nivel: "intermediario",
    imagem: "imagens/metodo-aeropress.svg",
    descricao: "Versátil, rápida e fácil de transportar, com resultado equilibrado e pouca amargura."
  }
];

function setFooterDates() {
  const currentYear = document.querySelector("#anoatual");
  const lastModified = document.querySelector("#ultimaModificacao");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Última modificação: ${document.lastModified}`;
  }
}

function setupMenu() {
  const menuButton = document.querySelector("#menuButton");
  const siteNav = document.querySelector("#siteNav");

  if (!menuButton || !siteNav) return;

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.textContent = isOpen ? "X" : "☰";
    menuButton.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function cafeCardTemplate(cafe) {
  return `<article class="card">
    <img src="${cafe.imagem}" alt="${cafe.alt}" width="420" height="280" loading="lazy">
    <div class="card-content">
      <h3>${cafe.nome}</h3>
      <p>${cafe.descricao}</p>
      <span class="tag">${cafe.detalhe}</span>
    </div>
  </article>`;
}

function renderCafes(filter = "todos") {
  const list = document.querySelector("#cafesList");
  if (!list) return;

  const filteredCafes = filter === "todos" ? cafes : cafes.filter((cafe) => cafe.categoria === filter);
  list.innerHTML = filteredCafes.map(cafeCardTemplate).join("");
}

function renderFeaturedCafes() {
  const featured = document.querySelector("#featuredCafes");
  if (!featured) return;

  featured.innerHTML = cafes.filter((cafe) => cafe.destaque).map(cafeCardTemplate).join("");
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderCafes(button.dataset.filter);
    });
  });
}

function methodCardTemplate(metodo) {
  return `<article class="method-card">
    <img src="${metodo.imagem}" alt="Ilustração do método ${metodo.nome}" width="420" height="260" loading="lazy">
    <h3>${metodo.nome}</h3>
    <p>${metodo.descricao}</p>
    <span class="tag">${metodo.sabor}</span>
  </article>`;
}

function renderMethods() {
  const list = document.querySelector("#methodsList");
  if (!list) return;

  list.innerHTML = metodos.map(methodCardTemplate).join("");
}

function setupPreferenceForm() {
  const form = document.querySelector("#preferenceForm");
  const select = document.querySelector("#coffeeMood");
  const message = document.querySelector("#preferenceMessage");

  if (!form || !select || !message) return;

  const savedMood = localStorage.getItem("coffeeMood");
  if (savedMood) {
    select.value = savedMood;
    message.textContent = `Preferência salva: ${select.options[select.selectedIndex].text}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("coffeeMood", select.value);
    message.textContent = `Preferência salva: ${select.options[select.selectedIndex].text}.`;
  });
}

function setupMethodForm() {
  const form = document.querySelector("#methodForm");
  const result = document.querySelector("#methodResult");

  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const experience = form.experience.value;
    const flavor = form.flavor.value;
    const match = metodos.find((metodo) => metodo.sabor === flavor && metodo.nivel === experience) ||
      metodos.find((metodo) => metodo.sabor === flavor) ||
      metodos[0];

    localStorage.setItem("lastMethod", match.nome);
    result.textContent = `Sugestão: experimente ${match.nome}. ${match.descricao}`;
  });
}

setFooterDates();
setupMenu();
renderFeaturedCafes();
renderCafes();
setupFilters();
renderMethods();
setupPreferenceForm();
setupMethodForm();
