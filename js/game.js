const grid = document.querySelector(".grid");
const section = document.querySelector("section");
const body = document.querySelector("body");
const spanPlayer = document.querySelector(".player");
const spanPlayerEnd = document.querySelector(".user");
const timer = document.querySelector(".timer");
const timerEnd = document.querySelector(".timerEnd");

const characters = [
  "among-black",
  "among-blue",
  "among-brown",
  "among-cyan",
  "among-green",
  "among-orange",
  "among-purple",
  "among-red",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;

  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 16) {
    clearInterval(this.loop);
    body.classList.add("win");
    section.classList.add("win");
    timerEnd.innerHTML = timer.innerHTML;
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 300);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) return;

  if (firstCard && secondCard) return;

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }

  target.parentNode.classList.add("reveal-card");
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../img/${character}.png')`;
  front.style.backgroundSize = `cover`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);

  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffleArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  spanPlayerEnd.innerHTML = localStorage.getItem("player");

  startTimer();
  loadGame();
};
