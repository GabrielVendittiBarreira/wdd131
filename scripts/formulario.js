const produtos = [
  {
    id: "fc-1888",
    nome: "capacitor de fluxo",
    classificacaomedia: 4.5
  },
  {
    id: "fc-2050",
    nome: "fios elétricos",
    classificacaomedia: 4.7
  },
  {
    id: "fs-1987",
    nome: "circuitos de tempo",
    classificacaomedia: 3.5
  },
  {
    id: "ac-2000",
    nome: "reator de baixa tensão",
    classificacaomedia: 3.9
  },
  {
    id: "jj-1969",
    nome: "equalizador de distorção",
    classificacaomedia: 5.0
  }
];

const currentYear = document.querySelector("#anoatual");
const lastModified = document.querySelector("#ultimaModificacao");
const productSelect = document.querySelector("#productName");
const reviewCounter = document.querySelector("#reviewCounter");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;

if (productSelect) {
  produtos.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.id;
    option.textContent = produto.nome;
    productSelect.appendChild(option);
  });
}

if (reviewCounter) {
  const storedCount = Number(localStorage.getItem("reviewCount")) || 0;
  const updatedCount = storedCount + 1;

  localStorage.setItem("reviewCount", updatedCount);
  reviewCounter.textContent = updatedCount;
}
