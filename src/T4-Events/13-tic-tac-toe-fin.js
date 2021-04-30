/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author F. de Sande
 * @since 24.apr.2020
 * @desc Tic Tac Toe Example. Final solution
 */

'use strict';


const HUMAN = 'x';
const COMPUTER = 'o';

/**
 * Assigns an empty space (square) to its new owner (HUMAN or COMPUTER)
 * @param {object} space - The HTML element corresponding to a game square
 * @param {string} owner - HUMAN or COMPUTER  
 */
function assignSpace(space, owner) {
  const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
  const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';
  const image = document.createElement('img');
  image.src = owner === HUMAN ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, HUMAN);
  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];
  assignSpace(freeSpace, COMPUTER);
  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const WINNER = getWinner();
  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (WINNER === HUMAN) {
    header.textContent = 'You win!';
  } else if (WINNER === COMPUTER) {
    header.textContent = 'Computer wins';
  } else {
    header.textContent = 'Tie';
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (let box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

// Returns HUMAN, COMPUTER, or null for no winner yet.
function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

// Returns HUMAN, COMPUTER, or null for no winner yet.
function getWinner() {
  for (let col = 0; col < 3; col++) {
    const OFFSET = col * 3;
    // Check rows and columns.
    let result = checkBoxes(OFFSET, 1 + OFFSET, 2 + OFFSET) ||
        checkBoxes(col, 3 + col, 6 + col);
    if (result) {
      return result;
    }
  }
  // Check diagonals
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

const freeBoxes = [];
// Map of box number -> HUMAN or COMPUTER
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}
