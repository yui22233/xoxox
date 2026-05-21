const board = document.getElementById("board");
const statusText = document.getElementById("status");

const size = 5;
const maxPieces = 4;

let currentPlayer = "X";
let gameActive = true;

let cells = [];

let playerMoves = {
  X: [],
  O: []
};

function createBoard() {

  board.innerHTML = "";

  cells = [];

  for(let i = 0; i < size * size; i++) {

    const cell = document.createElement("div");

    cell.classList.add("cell");

    cell.dataset.index = i;

    cell.addEventListener("click", handleClick);

    board.appendChild(cell);

    cells.push(cell);
  }
}

function handleClick(e) {

  const index = e.target.dataset.index;

  if(!gameActive) return;

  if(cells[index].textContent !== "") return;

  placeMark(index, currentPlayer);

  if(checkWinner(currentPlayer)) {

    statusText.textContent =
      `🎉 玩家 ${currentPlayer} 獲勝！`;

    gameActive = false;

    revealAll();

    return;
  }

  currentPlayer =
    currentPlayer === "X" ? "O" : "X";

  statusText.textContent =
    `玩家 ${currentPlayer} 回合`;
}

function placeMark(index, player) {

  const cell = cells[index];

  cell.textContent = player;

  cell.classList.remove("hidden");

  playerMoves[player].push(index);

  // 超過4顆 -> 移除最舊棋子
  if(playerMoves[player].length > maxPieces) {

    const oldIndex =
      playerMoves[player].shift();

    cells[oldIndex].textContent = "";

    cells[oldIndex].classList.remove("hidden");
  }

  // 2秒後隱形
  setTimeout(() => {

    if(cell.textContent !== "") {

      cell.classList.add("hidden");
    }

  }, 2000);
}

function revealAll() {

  cells.forEach(cell => {

    cell.classList.remove("hidden");
  });
}

function checkWinner(player) {

  const positions = playerMoves[player];

  for(let pos of positions) {

    let row = Math.floor(pos / size);
    let col = pos % size;

    if(
      checkDirection(row, col, 1, 0, player) ||
      checkDirection(row, col, 0, 1, player) ||
      checkDirection(row, col, 1, 1, player) ||
      checkDirection(row, col, 1, -1, player)
    ) {
      return true;
    }
  }

  return false;
}

function checkDirection(row, col, rowDir, colDir, player) {

  let count = 1;

  count += countCells(
    row,
    col,
    rowDir,
    colDir,
    player
  );

  count += countCells(
    row,
    col,
    -rowDir,
    -colDir,
    player
  );

  return count >= 4;
}

function countCells(
  row,
  col,
  rowDir,
  colDir,
  player
) {

  let count = 0;

  row += rowDir;
  col += colDir;

  while(
    row >= 0 &&
    row < size &&
    col >= 0 &&
    col < size &&
    cells[row * size + col].textContent === player
  ) {

    count++;

    row += rowDir;
    col += colDir;
  }

  return count;
}

function restart() {

  currentPlayer = "X";

  gameActive = true;

  playerMoves = {
    X: [],
    O: []
  };

  statusText.textContent =
    "玩家 X 回合";

  createBoard();
}

createBoard();