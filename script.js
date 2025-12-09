const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

// ✔ Random start
let currentPlayer = Math.random() < 0.5 ? "X" : "O";
statusText.textContent = `Player ${currentPlayer}'s Turn`;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || isGameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `${currentPlayer} Wins!`;
      isGameOver = true;
      return;
    }

    if (board.every((cell) => cell !== "")) {
      statusText.textContent = "It's a Draw!";
      isGameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  });
});

function checkWinner() {
  return winPatterns.some((pattern) => {
    return (
      board[pattern[0]] &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[0]] === board[pattern[2]]
    );
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  // ✔ Random start on restart
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  isGameOver = false;
  // ✔ Show correct player
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}

