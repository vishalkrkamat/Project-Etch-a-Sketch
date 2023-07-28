
const container = document.querySelector('#grid');
const rangeInput = document.getElementById('myRange');
const rangeValueDisplay = document.getElementById('rangeValue');
const colorPickerInput = document.getElementById('colorpicker');
const resetButton = document.querySelector('#resetButton');
const eraser = document.querySelector('#eraser');
let eraserModeActive = false;

rangeInput.addEventListener('input', updateGrid);

rangeInput.addEventListener('mousemove', updateRangeValueDisplay);

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
  // Adding event listeners to grid items after they are created
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.addEventListener("mousedown", setRandomBackgroundColor);
  });
  return gridItems
}

eraser.addEventListener('click', toggleEraserMode)

// Function to reset the background color of a grid item to null/transparent
function resetGridItemBackground(event) {
  const target = event.target;
  if (target.classList.contains("grid-item")) {
    target.style.backgroundColor = "";
  }
}

// Function to enable/disable eraser mode
function toggleEraserMode() {
  eraserModeActive = !eraserModeActive;
  if (eraserModeActive) {
    console.log("Hello")
    // Add click event listener to grid items when eraser mode is active
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("mousedown", setRandomBackgroundColor)
      item.addEventListener("click", resetGridItemBackground);
    });
  } else {
    console.log("Hello2")
    // Remove click event listener from grid items when eraser mode is inactive
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
      item.removeEventListener("click", resetGridItemBackground);
      item.addEventListener("mousedown", setRandomBackgroundColor);
    });
  }
}

//creating coloring function
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//  Function to apply a random background color to the clicked element
function setRandomBackgroundColor(event) {
  const target = event.target;
  if (target.classList.contains("grid-item")) {
    const randomColor = getRandomColor();
    target.style.backgroundColor = randomColor;
  }
}
resetButton.addEventListener('click',  () => {
  location.reload();
});

createGrid(5); // Initialize the grid with a default size