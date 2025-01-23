// game.js

const board = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍒",
  "🍓",
  "🍋",
  "🍍",
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍒",
  "🍓",
  "🍋",
  "🍍",
];
let flippedCards = [];
let matchedPairs = 0;

// Add sound effects
const flipSound = new Audio("Flip2.mp3"); // You can replace this with a valid path to a flip sound
const matchSound = new Audio("match.mp3"); // Replace with a valid match sound

// Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the cards on the board
function createBoard() {
  shuffle(cardValues);
  board.innerHTML = "";
  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Flip a card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    flipSound.play(); // Play the flip sound
    this.classList.add("flipped");
    this.innerText = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    matchSound.play(); // Play the match sound
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cardValues.length / 2) {
      setTimeout(() => alert("You win!"), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerText = "";
      secondCard.innerText = "";
      flippedCards = [];
    }, 1000);
  }
}

// Reset the game
resetButton.addEventListener("click", () => {
  flippedCards = [];
  matchedPairs = 0;
  createBoard();
});

// Initialize the board when the page loads
createBoard();
