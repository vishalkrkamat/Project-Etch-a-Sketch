//creating dynamic grid
let container = document.querySelector('#grid');

// Manipulate the grid template using JavaScript
container.style.gridTemplateRows = 'repeat(39, 1fr)'; // Set the grid template rows
container.style.gridTemplateColumns = 'repeat(39, 1fr)'; // Set the grid template columns
// for (let i = 0; i <= 11; i++) {
//   let elem = document.createElement('span');
//   elem.classList.add('grid-item');
//   container.appendChild(elem);
// }

const gridItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6'
];

gridItems.forEach(item => {
  const gridElement = document.createElement('div');
  gridElement.classList.add('grid-item');
  container.appendChild(gridElement);
});

const rangeInput = document.getElementById('myRange');
const rangeValueDisplay = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function() {
  const selectedValue = rangeInput.value;
  console.log(selectedValue)
  rangeValueDisplay.textContent = selectedValue;
  const rangePercent = (selectedValue - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
  rangeInput.style.backgroundSize = rangePercent + '% 100%';
});

rangeInput.addEventListener('mousemove', function(e) {
  const selectedValue = rangeInput.value;
  rangeValueDisplay.textContent = selectedValue;
  rangeValueDisplay.style.left = (-60+e.clientX) + 'px';
});

