// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');

// Functions
// Functions
const createCards = (quantity) => {
  let cards = [1, 1]; // Inicializamos el arreglo con los dos primeros números
  for (let i = 2; i < +quantity; i++) {
    const nextNumber = cards[i - 1] + cards[i - 2]; // Calculamos el siguiente número en la secuencia
    cards.push(nextNumber); // Lo agregamos al arreglo
  }
  return cards;
}
const drawCards = (cards) => {
  const cardElements = cards.map((number, index) => `<div class="square">${number} <span class="delete-icon" onclick="deleteCard(${index})">x</span></div>`).join('');
  response.innerHTML = cardElements;
}
// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(formData.get('quantity'));
  drawCards(cards);
}

const onDeleteIconClick = (event) => {
  if (event.target.classList.contains('delete-icon')) {
    event.target.parentElement.remove();
  }
}

// Event Listeners
form.addEventListener('submit', onFormSubmit);
response.addEventListener('click', onDeleteIconClick);
