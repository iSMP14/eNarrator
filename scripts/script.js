// Variable para almacenar las voces disponibles
let voices = [];

// Función para obtener las voces disponibles y llenar el elemento select
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  let voiceSelect = document.getElementById("voiceSelect");
  let languageSelect = document.getElementById("languageSelect");

  let selectedLanguage = languageSelect.value;

  // Limpiar las opciones existentes antes de llenarlas de nuevo
  voiceSelect.innerHTML = "";

  // Filtrar las voces por el idioma seleccionado
  let filteredVoices = voices.filter((voice) =>
    voice.lang.startsWith(selectedLanguage)
  );

  // Llenar el select con las voces filtradas
  filteredVoices.forEach(function (voice, i) {
    let option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Función para llenar el select de idiomas
function populateLanguages() {
  voices = window.speechSynthesis.getVoices();
  let languageSelect = document.getElementById("languageSelect");

  // Limpiar las opciones existentes antes de llenarlas de nuevo
  languageSelect.innerHTML = "";

  // Obtener los idiomas únicos de las voces
  let languages = [...new Set(voices.map((voice) => voice.lang.split("-")[0]))];

  // Llenar el select de idiomas
  languages.forEach(function (language) {
    let option = document.createElement("option");
    option.value = language;
    option.innerHTML = language;
    languageSelect.appendChild(option);
  });

  populateVoices();
}

// Esperar hasta que las voces estén cargadas antes de intentar obtenerlas
window.speechSynthesis.onvoiceschanged = function () {
  populateLanguages();
};

// Obtener el elemento del botón
let button = document.getElementById("myButton");

// Agregar un evento de clic al botón
button.addEventListener("click", function (event) {
  event.preventDefault();
  // Obtener el texto ingresado por el usuario
  let text = document.getElementById("myInput").value;

  // Obtener la voz seleccionada
  let voiceSelect = document.getElementById("voiceSelect");
  let selectedVoice = voiceSelect.value;

  // Verificar si la API de síntesis de voz es compatible
  if ("speechSynthesis" in window) {
    let speechSynthesis = window.speechSynthesis;

    // Verificar si hay voces disponibles
    if (voices.length > 0) {
      // Crear un objeto de síntesis de voz
      let utterance = new SpeechSynthesisUtterance(text);

      // Establecer la voz seleccionada
      let selectedVoiceObj = voices.find(function (voice) {
        return voice.name === selectedVoice;
      });
      utterance.voice = selectedVoiceObj;

      // Iniciar la síntesis de voz
      speechSynthesis.speak(utterance);
    } else {
      // Si no hay voces disponibles, mostrar un mensaje de error al usuario
      console.error("No hay voces disponibles.");
    }
  } else {
    // Si la API de síntesis de voz no es compatible, mostrar un mensaje de error al usuario
    console.error(
      "La API de síntesis de voz no es compatible con este navegador."
    );
  }
});

// Agregar un evento de cambio al select de idiomas para filtrar las voces
document
  .getElementById("languageSelect")
  .addEventListener("change", function () {
    populateVoices();
  });
