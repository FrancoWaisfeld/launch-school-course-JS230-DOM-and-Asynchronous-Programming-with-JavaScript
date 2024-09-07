document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  function addToList(name, quantity) {
    const list = document.querySelector('#grocery-list');

    let item = document.createElement('li');
    item.textContent = `${quantity} ${name}`;
    
    list.appendChild(item);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    let itemName = form.querySelector('#name').value;
    let quantity = form.querySelector('#quantity').value || '1';

    addToList(itemName, quantity);
    form.reset();
  });
});