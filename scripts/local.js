const currentYear = document.querySelector("#anoatual");
const lastModified = document.querySelector("#ultimaModificacao");
const temperature = 27;
const windSpeed = 13;
const windChill = document.querySelector("#sensacaoTermica");

function calcularSensacaoTermica(temp, wind) {
  return 13.12 + 0.6215 * temp - 11.37 * wind ** 0.16 + 0.3965 * temp * wind ** 0.16;
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Última modificação: ${document.lastModified}`;

if (temperature <= 10 && windSpeed > 4.8) {
  windChill.textContent = `${calcularSensacaoTermica(temperature, windSpeed).toFixed(1)} °C`;
} else {
  windChill.textContent = "N/A";
}
