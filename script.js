const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameOver = false;

function render() {
  board.innerHTML = "";

  cells.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = cell;
    div.onclick = () => handleClick(i);
    board.appendChild(div);
  });
}

function handleClick(i) {
  if (cells[i] !== "" || gameOver) return;

  cells[i] = currentPlayer;

  const winner = checkWinner();

  if (winner) {
    statusText.innerText = winner === "平手" ? "平手!" : `玩家 ${winner} 勝利!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `玩家 ${currentPlayer} 回合`;
  }

  render();
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of wins) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return cells.includes("") ? null : "平手";
}

function restart() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusText.innerText = "玩家 X 回合";
  render();
}

render();