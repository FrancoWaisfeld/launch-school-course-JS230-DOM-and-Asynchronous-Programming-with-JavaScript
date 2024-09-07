todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

document.addEventListener('DOMContentLoaded', () => {
  let todosTemplate = Handlebars.compile(document.querySelector('#todos_template').innerHTML);
  let todosHTML = todosTemplate({todo_items: todo_items});
  document.querySelector('#todos').innerHTML = todosHTML;

  function hideConfirmPrompt() {
    document.querySelector('.confirm_prompt').classList.add('hide');
    document.querySelector('.overlay').classList.add('hide');
  }

  function showConfirmPrompt() {
    document.querySelector('.confirm_prompt').classList.remove('hide');
    document.querySelector('.overlay').classList.remove('hide');
  }

  let deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
      let confirmTemplate = Handlebars.compile(document.querySelector('#confirm-template').innerHTML);
      let todoID = button.parentElement.getAttribute('data-id');
      let confirmHTML = confirmTemplate({id: todoID});
      let confirmPrompt = document.querySelector('.confirm_prompt');
      confirmPrompt.innerHTML = confirmHTML;

      showConfirmPrompt();

      document.querySelector('.confirm_yes').addEventListener('click', event => {
        event.preventDefault();
        let todos = document.querySelector('#todos');
        let todo = document.querySelector(`li[data-id="${todoID}"]`);
        todos.removeChild(todo);
    
        hideConfirmPrompt();
        confirmHTML.innerHTML = '';
      });

      document.querySelector('.confirm_no').addEventListener('click', event => {
        event.preventDefault();
        hideConfirmPrompt();
        confirmHTML.innerHTML = '';
      });
    });
  });
});