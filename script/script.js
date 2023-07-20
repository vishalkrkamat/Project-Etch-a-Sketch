const container = document.querySelector('#grid');
    const rangeInput = document.getElementById('myRange');
    const rangeValueDisplay = document.getElementById('rangeValue');
    const colorPickerInput = document.getElementById('colorpicker');

    rangeInput.addEventListener('input', updateGrid);

    rangeInput.addEventListener('mousemove', updateRangeValueDisplay);

    function updateGrid() {
      const selectedValue = rangeInput.value;
      rangeValueDisplay.textContent = selectedValue;
      const rangePercent = ((selectedValue - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
      rangeInput.style.backgroundSize = rangePercent + '% 100%';
      createGrid(selectedValue);
    }

    function updateRangeValueDisplay(e) {
      const selectedValue = rangeInput.value;
      rangeValueDisplay.textContent = selectedValue;
      rangeValueDisplay.style.left = (-60 + e.clientX) + 'px';
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

    function setBackgroundColorFromColorPicker() {
      colorPickerInput.addEventListener('click', () => {
        if (colorPickerInput.type === 'color') {
          colorPickerInput.type = 'text';
          colorPickerInput.click();
          colorPickerInput.type = 'color';
        }
      });
    }

    setBackgroundColorFromColorPicker();
    createGrid(5); // Initialize the grid with a default size