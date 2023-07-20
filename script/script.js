//creating dynamic grid
let container = document.querySelector('#grid');

const rangeInput = document.getElementById('myRange');
const rangeValueDisplay = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function() {
  const selectedValue = rangeInput.value;
  console.log(selectedValue)
  rangeValueDisplay.textContent = selectedValue;
  const rangePercent = (selectedValue - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
  rangeInput.style.backgroundSize = rangePercent + '% 100%';
  creategrid(selectedValue); // Call creategrid() with the selectedValue as an argument
});

rangeInput.addEventListener('mousemove', function(e) {
  const selectedValue = rangeInput.value;
  rangeValueDisplay.textContent = selectedValue;
  rangeValueDisplay.style.left = (-60+e.clientX) + 'px';
});
function creategrid(temv){
  container.style.gridTemplateRows = `repeat(${temv}, 1fr)`; // Set the grid template rows
  container.style.gridTemplateColumns = `repeat(${temv}, 1fr)` // Set the grid template columns
}


