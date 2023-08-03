
const container = document.querySelector('#grid');
const rangeInput = document.getElementById('myRange');
const rangeValueDisplay = document.getElementById('rangeValue');
const resetButton = document.querySelector('#resetButton');
const clear = document.querySelector('#clear')
const colorselect = document.querySelector("#colorselctor")
const randomcolor = document.querySelector('#randomcolor')
const body = document.body;
const eraser = document.querySelector('#eraser');

// Flags
let eraserModeActive = false;
let ranclo = false;
let colorpick = false;

// Event listeners
rangeInput.addEventListener('input', updateGrid);
rangeInput.addEventListener('mousemove', updateRangeValueDisplay);
randomcolor.addEventListener('click', rancolor)
eraser.addEventListener('click', toggleEraserMode)
colorselect.addEventListener('click', setColor)

//selecting grid
function updateGrid() {
  const selectedValue = rangeInput.value;
  rangeValueDisplay.textContent = selectedValue;
  const rangePercent = ((selectedValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
  rangeInput.style.backgroundSize = rangePercent + '% 100%';
  createGrid(selectedValue);
}
// display value range
function updateRangeValueDisplay(e) {
  const selectedValue = rangeInput.value;
  rangeValueDisplay.textContent = selectedValue;
  rangeValueDisplay.style.left = (-140 + e.clientX) + 'px';
}

function createGrid(size) {
  container.innerHTML = '';
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      container.appendChild(gridItem);
    }
  }
}

// Function to reset the background color of a grid item to null/transparent
function resetGridItemBackground(event) {
  const target = event.target;
  if (target.classList.contains("grid-item")) {
    target.style.backgroundColor = "";
  }
}

//function to enable/disbale random color button
function rancolor() {
  ranclo = !ranclo;
  if (ranclo) {
    // Adding event listeners to grid items after they are created
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.addEventListener("mouseover", setRandomBackgroundColor);
    });
  } else {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("mouseover", setRandomBackgroundColor)
    })
  }
}

// Function to enable/disable eraser mode
function toggleEraserMode() {
  eraserModeActive = !eraserModeActive;
  if (eraserModeActive) {
    body.classList.add('eraser-cursor');
    // Add click event listener to grid items when eraser mode is active
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("mouseover", setRandomBackgroundColor)
      item.addEventListener("mouseover", resetGridItemBackground);
    });
  } else {
    body.classList.remove('eraser-cursor');
    // Remove click event listener from grid items when eraser mode is inactive
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("mouseover", resetGridItemBackground);
    });
  }
}

clear.addEventListener('click', () => {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.style.backgroundColor = "";
    item.removeEventListener("mouseover", setRandomBackgroundColor)
  });
})

resetButton.addEventListener('click', () => {
  location.reload();
});

//creating coloring function
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setColor() {
  colorpick = !colorpick;
  if (colorpick) {
    // Add event listeners to all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.addEventListener("mouseover", selectColor);
    });
  } else {
    // Remove event listeners from all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("mouseover", selectColor);
    });
  }
}

function selectColor(event) {
  const colorPicker = document.getElementById("colorpicker");

  // Get the selected color value
  const selectedColor = colorPicker.value;

  const target = event.target;
  if (target.classList.contains("grid-item")) {
    target.style.backgroundColor = selectedColor;
  }
}

//  Function to apply a random background color to the clicked element
function setRandomBackgroundColor(event) {
  const target = event.target;
  if (target.classList.contains("grid-item")) {
    const randomColor = getRandomColor();
    target.style.backgroundColor = randomColor;
  }
}

createGrid(5); // Initialize the grid with a default size