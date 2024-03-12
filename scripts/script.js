// Variable para almacenar las voces disponibles
var voices = [];

// Función para obtener las voces disponibles y llenar el elemento select
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  var voiceSelect = document.getElementById("voiceSelect");

  // Limpiar las opciones existentes antes de llenarlas de nuevo
  voiceSelect.innerHTML = "";

  // Llenar el select con las voces disponibles
  voices.forEach(function (voice, i) {
    var option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = voice.name;
    voiceSelect.appendChild(option);
  });
}

// Esperar hasta que las voces estén cargadas antes de intentar obtenerlas
window.speechSynthesis.onvoiceschanged = function () {
  populateVoices();
};

// Obtener el elemento del botón
var button = document.getElementById("myButton");

// Agregar un evento de clic al botón
button.addEventListener("click", function () {
  // Obtener el texto ingresado por el usuario
  var text = document.getElementById("myInput").value;

  // Obtener la voz seleccionada
  var voiceSelect = document.getElementById("voiceSelect");
  var selectedVoice = voiceSelect.value;

  // Verificar si la API de síntesis de voz es compatible
  if ("speechSynthesis" in window) {
    var speechSynthesis = window.speechSynthesis;

    // Verificar si hay voces disponibles
    if (voices.length > 0) {
      // Crear un objeto de síntesis de voz
      var utterance = new SpeechSynthesisUtterance(text);

      // Establecer la voz seleccionada
      var selectedVoiceObj = voices.find(function (voice) {
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
