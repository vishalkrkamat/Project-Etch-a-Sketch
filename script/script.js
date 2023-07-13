//creating dynamic grid
let container = document.querySelector('#grid');
for (let i = 0; i <= 11; i++) {
  let elem = document.createElement('span');
  elem.classList.add('grid-item');
  container.appendChild(elem);
}
