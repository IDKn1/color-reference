function copyHexCode() {
  var card = document.getElementById("color-code");

  navigator.clipboard.writeText(card.textContent);

  alert("Copied hex code: " + card.textContent + " to clipboard");
}
