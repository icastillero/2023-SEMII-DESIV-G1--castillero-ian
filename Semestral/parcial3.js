const form = document.getElementById('myForm');
const piramide = document.getElementById('piramide');
const sumatoria = document.querySelector('.sumatoria');

const createCards = (quantity) => {
  piramide.innerHTML = ''; // Limpiar la pirámide anterior
  sumatoria.innerHTML = '';
  if (quantity >= 2 && quantity <= 50) {
      let pyramid = [];
      for (let i = 0; i < quantity; i++) {
          pyramid.push([]);
          let row = document.createElement('div');
          row.classList.add(`fila${i + 1}`);
          let square = '';
          for (let j = 0; j <= i; j++) {
              let min = 1;
              let max = 99;
              let randomNumInRange = Math.floor(Math.random() * (max - min + 1)) + min;
              pyramid[i].push(randomNumInRange);
              square += `<div class="caja" data-value="${randomNumInRange}">${randomNumInRange}</div>`;
          }
          row.innerHTML = square;
          piramide.appendChild(row);
      }

      for (let i = quantity - 2; i >= 0; i--) {
          for (let j = 0; j <= i; j++) {
              pyramid[i][j] += Math.max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
          }
      }

      let maxPath = pyramid[0][0];
      console.log(`El camino con el mayor peso tiene un valor de ${maxPath}.`);

      let sumElement = document.createElement('div');
      sumElement.textContent = ` ${maxPath}`;
      sumatoria.appendChild(sumElement);

      // Marcar el camino seleccionado
      let currentRow = 0;
      let currentCol = 0;
      for (let i = 0; i < quantity; i++) {
          let cajas = piramide.querySelector(`.fila${i + 1}`).children;
          cajas[currentCol].classList.add('selected');
          if (i < quantity - 1) {
              currentRow++;
              currentCol = pyramid[currentRow][currentCol] > pyramid[currentRow][currentCol + 1] ? currentCol : currentCol + 1;
          }
      }
  }
};

const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cards = createCards(parseInt(formData.get('quantity')));
};

form.addEventListener('submit', onFormSubmit);

const reiniciarPiramide = () => {
  // Limpiar la pirámide
  piramide.innerHTML = '';
  sumatoria.innerHTML = '';

  // Restablecer el formulario
  form.reset();
};

const boton2 = document.getElementById('boton2');
boton2.addEventListener('click', reiniciarPiramide);