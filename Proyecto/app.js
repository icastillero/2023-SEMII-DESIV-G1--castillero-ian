const form = document.querySelector('form');
const response = document.querySelector('#response');
 
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
const drawPyramid = (quantity) => {
  response.innerHTML = ''; // limpiar
  const pyramid = [];
 
  for (let i = 1; i <= quantity; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const rowArray = [];
 
    for (let j = 1; j <= i; j++) {
      const cuadros = document.createElement('div');
      cuadros.className = 'square';
      const randomValue = getRandomNumber(1, 99); // rango aleatorio
      cuadros.textContent = randomValue;
      row.appendChild(cuadros);
      rowArray.push(randomValue);
    }
 
    response.appendChild(row);
    pyramid.push(rowArray);
  }
 
  const maxPathSum = findMaxPath(pyramid);
  console.log('La ruta de mayor peso tiene una suma de:', maxPathSum);
}
 
const findMaxPath = (pyramid) => {
  const n = pyramid.length;
 
  // recorrer la piramide
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      pyramid[i][j] += Math.max(pyramid[i + 1][j], pyramid[i + 1][j + 1]);
    }
  }
 
  return pyramid[0][0]; // El valor en la cima de la pirámide es la suma máxima
}
 
// Función para crear una nueva pirámide
const crearNuevaPiramide = () => {
  const formData = new FormData(form);
  const quantity = formData.get('quantity');
  if (quantity <= 0 || quantity > 50) {
    alert('Por favor, ingrese una cantidad válida (un número mayor que 0 y menor o igual a 50).');
    return;
  }
  drawPyramid(quantity);
}
 
form.addEventListener('submit', (event) => {
  event.preventDefault();
  crearNuevaPiramide(); // Llama a la función crearNuevaPiramide al enviar el formulario
});
 
// Agrega un controlador de eventos al botón de recarga existente
const reloadButton = document.getElementById('reloadButton');
reloadButton.addEventListener('click', crearNuevaPiramide);
 