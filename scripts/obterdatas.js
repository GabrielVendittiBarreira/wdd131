const currentYear = document.querySelector("#anoatual");
const lastModified = document.querySelector("#ultimaModificacao");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;
