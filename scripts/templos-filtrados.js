const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "São Paulo Brasil",
    localizacao: "São Paulo, Brasil",
    consagracao: "1978, 30 de outubro",
    area: 59246,
    urlDaImagem: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Templo_de_sao_paulo.jpg/500px-Templo_de_sao_paulo.jpg"
  },
  {
    nomeDoTemplo: "Recife Brasil",
    localizacao: "Recife, Brasil",
    consagracao: "2000, 15 de dezembro",
    area: 37200,
    urlDaImagem: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/recife-brazil/400x250/recife-brazil-temple-lds-700211-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manaus Brasil",
    localizacao: "Manaus, Brasil",
    consagracao: "2012, 10 de junho",
    area: 32032,
    urlDaImagem: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Templo_de_Manaus.jpg/500px-Templo_de_Manaus.jpg"
  }
];

const currentYear = document.querySelector("#anoatual");
const lastModified = document.querySelector("#ultimaModificacao");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const templeGrid = document.querySelector("#temple-grid");
const albumTitle = document.querySelector("#album-title");
const navLinks = document.querySelectorAll("#navigation a");

const filterTitles = {
  inicio: "Todos os Templos",
  antigo: "Templos Antigos",
  novo: "Templos Novos",
  grande: "Templos Grandes",
  pequeno: "Templos Pequenos"
};

function getDedicationYear(templo) {
  return Number.parseInt(templo.consagracao.slice(0, 4), 10);
}

function createTempleCard(templo) {
  const card = document.createElement("figure");
  const caption = document.createElement("figcaption");
  const title = document.createElement("h2");
  const location = document.createElement("p");
  const dedication = document.createElement("p");
  const area = document.createElement("p");
  const image = document.createElement("img");

  card.classList.add("temple-card");
  title.textContent = templo.nomeDoTemplo;
  location.innerHTML = `<span>Localização:</span> ${templo.localizacao}`;
  dedication.innerHTML = `<span>Consagrado:</span> ${templo.consagracao}`;
  area.innerHTML = `<span>Área:</span> ${templo.area.toLocaleString("pt-BR")} pés²`;
  image.src = templo.urlDaImagem;
  image.alt = templo.nomeDoTemplo;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  caption.append(title, location, dedication, area);
  card.append(image, caption);

  return card;
}

function getFilteredTemples(filter) {
  if (filter === "antigo") {
    return templos.filter((templo) => getDedicationYear(templo) < 1900);
  }

  if (filter === "novo") {
    return templos.filter((templo) => getDedicationYear(templo) > 2000);
  }

  if (filter === "grande") {
    return templos.filter((templo) => templo.area > 90000);
  }

  if (filter === "pequeno") {
    return templos.filter((templo) => templo.area < 10000);
  }

  return templos;
}

function displayTemples(filter = "inicio") {
  templeGrid.innerHTML = "";
  albumTitle.textContent = filterTitles[filter];
  getFilteredTemples(filter).forEach((templo) => templeGrid.appendChild(createTempleCard(templo)));
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "X" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = event.target.dataset.filter;

    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    event.target.classList.add("active");
    displayTemples(filter);
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

displayTemples();
document.querySelector('[data-filter="inicio"]').classList.add("active");
