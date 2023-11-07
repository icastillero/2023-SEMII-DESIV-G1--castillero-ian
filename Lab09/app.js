const form = document.querySelector('form');
const response = document.querySelector('#response');
const drawPyramid = (quantity) => {
    response.innerHTML = ''; // Limpiar el contenido anterior
    let count = 1;
    for (let i = 1; i <= quantity; i++) {
      const row = document.createElement('div');
      row.className = 'row';
  
      for (let j = 1; j <= i; j++) {
        const cuadros = document.createElement('div');
        cuadros.className = 'square';
        cuadros.textContent = count;
        row.appendChild(cuadros);
        count++;
      }
  
      response.appendChild(row);
    }
  }
  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = formData.get('quantity');
    if (quantity <= 0) {
      alert('Ingrese una cantidad válida el numero debe ser mayor a 0.');
      return;
    }
    drawPyramid(quantity);
  }
  form.addEventListener('submit', onFormSubmit);
