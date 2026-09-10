const currentYear = document.querySelector("#anoatual");
const lastModified = document.querySelector("#ultimaModificacao");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "X" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
});
