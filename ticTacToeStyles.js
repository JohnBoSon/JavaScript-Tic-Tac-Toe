*, *::after, *::before {
  box-sizing: border-box;
}

:root {
  --cell-size: 100px;
  --mark-size: calc(var(--cell-size) * .9);
}

body {
  margin: 0;
}

.board {
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, auto)
}

.cell {
  width: var(--cell-size);
  height: var(--cell-size);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.cell:first-child,
.cell:nth-child(2),
.cell:nth-child(3) {
  border-top: none;
}

.cell:nth-child(3n + 1) {
  border-left: none;
}

.cell:nth-child(3n + 3) {
  border-right: none;
}

.cell:last-child,
.cell:nth-child(8),
.cell:nth-child(7) {
  border-bottom: none;
}

.cell.x,
.cell.circle {
  cursor: not-allowed;
}

.cell.x::before,
.cell.x::after,
.cell.circle::before {
  background-color: black;
}

.board.x .cell:not(.x):not(.circle):hover::before,
.board.x .cell:not(.x):not(.circle):hover::after,
.board.circle .cell:not(.x):not(.circle):hover::before {
  background-color: lightgrey;
}

.cell.x::before,
.cell.x::after,
.board.x .cell:not(.x):not(.circle):hover::before,
.board.x .cell:not(.x):not(.circle):hover::after {
  content: '';
  position: absolute;
  width: calc(var(--mark-size) * .15);
  height: var(--mark-size);
}

.cell.x::before,
.board.x .cell:not(.x):not(.circle):hover::before {
  transform: rotate(45deg);
}

.cell.x::after,
.board.x .cell:not(.x):not(.circle):hover::after {
  transform: rotate(-45deg);
}

.cell.circle::before,
.cell.circle::after,
.board.circle .cell:not(.x):not(.circle):hover::before,
.board.circle .cell:not(.x):not(.circle):hover::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.cell.circle::before,
.board.circle .cell:not(.x):not(.circle):hover::before {
  width: var(--mark-size);
  height: var(--mark-size);
}

.cell.circle::after,
.board.circle .cell:not(.x):not(.circle):hover::after {
  width: calc(var(--mark-size) * .7);
  height: calc(var(--mark-size) * .7);
  background-color: white;
}

.winning-message {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .9);
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 5rem;
  flex-direction: column;
}

.winning-message button {
  font-size: 3rem;
  background-color: white;
  border: 1px solid black;
  padding: .25em .5em;
  cursor: pointer;
}

.winning-message button:hover {
  background-color: black;
  color: white;
  border-color: white;
}

.winning-message.show {
  display: flex;
}
