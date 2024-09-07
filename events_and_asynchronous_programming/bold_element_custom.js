function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

const sectionElement = document.querySelector('section');

sectionElement.addEventListener('bolded', (event) => {
  event.target.classList.add('highlight');
});

makeBold(sectionElement);