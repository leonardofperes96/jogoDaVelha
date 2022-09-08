// Seleção de elementos

const cellElements = document.querySelectorAll('[data-cell]');
const container = document.querySelector('[data-container]');
const resetButton = document.querySelector('[data-reset-button]');
const winningDiv = document.querySelector('[data-winning-div]');
const winningMessage = document.querySelector('[data-winning-message]');

let isCircle = false;

//Funções

const restartGame = () => {
  container.classList.remove('x');
  container.classList.remove('circle');
  container.classList.add('x');
};
restartGame();

const winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (classToAdd) => {
  return winningPossibilities.some((possibility) => {
    return possibility.every((index) => {
      return cellElements[index].classList.contains(classToAdd);
    });
  });
};

const checkDraw = () => {
  const checkDraw = [...cellElements];
  return checkDraw.every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
};

const swapSymbols = () => {
  isCircle = !isCircle;

  container.classList.remove('x');
  container.classList.remove('circle');

  if (isCircle) {
    container.classList.add('circle');
  } else {
    container.classList.add('x');
  }
};

const appendWin = () => {
  winningMessage.innerText = isCircle ? 'X ganhou!' : 'O ganhou';
  winningDiv.classList.add('show-winning-message');
};

const appendDraw = () => {
  winningMessage.innerText = 'Empatou!';
  winningDiv.classList.add('show-winning-message');
};

const handleClick = (e) => {
  // Adicionar classes

  const cell = e.target;
  const classToAdd = isCircle ? 'circle' : 'x';

  cell.classList.add(classToAdd);

  // Mudar classes de acordo com o simbolo
  swapSymbols();

  // Checar Empate
  checkDraw();
  const isDraw = checkDraw(classToAdd);

  // Checar Vitória

  const isWin = checkWin(classToAdd);
  if (isWin) {
    appendWin();
  }
  if (isDraw) {
    appendDraw();
  }
};

const handleReset = () => {
  cellElements.forEach((cell) => {
    cell.classList.remove('x');
    cell.classList.remove('circle');
    winningDiv.classList.remove('show-winning-message');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
    window.location.reload();
  });
};

// Eventos

cellElements.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

resetButton.addEventListener('click', handleReset);
