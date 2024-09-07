document.addEventListener('DOMContentLoaded', () => {
  let modal = document.querySelector('#modal');
  let modalLayer = document.querySelector('#modal-layer');
  let modalTitle = modal.querySelector('h3');
  let modalImage = modal.querySelector('img');
  let modalText = modal.querySelector('p');
  let teamLinks = document.querySelectorAll('#team li > a');

  function showModal(event) {
    event.preventDefault();
    let link = event.target.closest('a');
    modalTitle.textContent = link.dataset.name;
    modalText.textContent = link.dataset.text;
    modalImage.src = link.dataset.imageSource;
    modalImage.alt = link.dataset.name
    modalLayer.classList.replace('hide', 'show');
    modal.classList.replace('hide', 'show');
  }

  function hideModal(event) {
    event.preventDefault();
    let link = event.target.closest('a');
    modalTitle.textContent = '';
    modalText.textContent = '';
    modalImage.src = '';
    modalImage.alt = '';
    modalLayer.classList.replace('show', 'hide');
    modal.classList.replace('show', 'hide');
  }

  teamLinks.forEach(link => link.addEventListener('click', showModal))
  modalLayer.addEventListener('click', hideModal);
  document.querySelector('#modal a.close').addEventListener('click', hideModal);
  document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      hideModal();
    }
  });
});