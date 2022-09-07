const input = document.querySelector("#name");
const button = document.querySelector("#btn");
const form = document.querySelector("#form");

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
    return;
  }

  button.setAttribute("disabled", "");
};

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  window.location =
    // "https://raphaelbaccega.github.io/memory-game/pages/pre-game.html";
    "http://127.0.0.1:5500/pages/pre-game.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
