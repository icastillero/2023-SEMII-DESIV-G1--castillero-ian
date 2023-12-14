// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
// ----------------------------------------

// Functions
const createCards = (quantity) => {
  let cards = '';
  for(let i = 0; i < +quantity; i++) {
    cards += `
      <div class="square">${i + 1}</div>
    `;
  }
  return cards;
}

const drawCards = (cards) => {
  response.innerHTML = cards;
}
// ----------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(formData.get('quantity'));
  drawCards(cards);
}
// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// ----------------------------------------